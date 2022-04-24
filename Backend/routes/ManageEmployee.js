const router = require('express').Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
require('../models/Employees')




//Employees model
const Departements = require('../models/Departements')
const Employees = require('../models/Employees')

router.post('/addemployee',
    [
        check('username', 'Please provide employee username').not().isEmpty(), 
        check('password', 'Please provide employee password').not().isEmpty(),
        check('f_name', 'Please provide employee first name').not().isEmpty(),
        check('l_name', 'Please provide employee last name').not().isEmpty(),
        check('role', 'Please provide employee last name').not().isEmpty(),
        check('email', 'Please provide employee email').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { f_name, l_name,  username,  password,email , departement , role ,boss , position   , gender } = req.body
        const _id  = mongoose.Types.ObjectId()
        try {
            let employees = await Employees.findOne({ username })
            if (employees) {
                return res.status(400).json({ msg: 'user already exists' })
            }

            employees = new Employees({
                _id,
                f_name,
                l_name,
                username, 
                password,
                email,
                departement, 
                role,
                boss,
                position,  
                gender
            })
            console.log(username)
            const salt = await bcrypt.genSalt(10)
            employees.password = await bcrypt.hash(password, salt)

            await employees.save()
            const playload = {
                employees: {
                    id: employees._id,
                    username: employees.username,
                    departement: employees.departement,
                    position: employees.position
                }
            }
            jwt.sign(playload, process.env.SECRET, {
                expiresIn: 31556926
            },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })


router.get("/:id", (req, res, next) => {
    Employees.findById(req.params.id)
        .populate('boss','username')
        .populate('departement','departement_name')
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

router.patch("/:id", (req, res, next) => {
    Employees.findById(req.params.id)
        .then(employees => {
            employees.f_name=req.body.f_name
            employees.l_name=req.body.l_name
            employees.username = req.body.username 
            employees.email = req.body.email 
            employees.departement = req.body.departement 
            employees.role = req.body.role 
            employees.boss = req.body.boss  
            employees.gender=req.body.gender
            employees.position=req.body.position
            employees.save()
                .then(() => res.json('employee updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid username or email' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Employees.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'employee deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
router.get("/", (req, res, next) => {
    Employees.find()
        .populate('departement')
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/loginemployee',
    [
        check('username', 'Please provide a valid username').exists(),
        check('password', 'Please provide a password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { username, password } = req.body
         let employee = await Employees.findOne({ username })
        if (!employee) {
            return res.status(400).json({ msg: 'username doesnt exist' })
        }

        const isMatch = await bcrypt.compare(password, employee.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'wrong password' })
        }
        try {
            let employee = await Employees.findOne({username})
            if (!employee) {
                return res.status(400).json({msg: 'username doesnt exist'})
            }

            const isMatch = await bcrypt.compare(password, employee.password)
            if (!isMatch) {
                return res.status(400).json({msg: 'wrong password'})
            }

            const playload = {
                employee:{
                    id: employee._id,
                    username: employee.username,
                    departement: employee.departement,
                    position: employee.position
                }
            }
            jwt.sign(playload, process.env.SECRET, {
                expiresIn:31556926
            }, 
            (err,token) => {
                if (err) throw err
                res.json({token})
            })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
            
        } 
    })

module.exports = router