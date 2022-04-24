const router = require('express').Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')


//form model
const Conge = require('../models/Conge')
const Departements = require('../models/Departements')
const Employees = require('../models/Employees')


router.get("/allConge", async (req, res, next) => {
    let varArray = []
    Conge.find().sort({dateCreated: -1})
        .populate('departement')
        .populate('employee')
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


router.post('/send',
    [
        check('reason', 'Please provide your first name').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        try {
            const conge = new Conge({
                _id: mongoose.Types.ObjectId(),
                type: req.body.type,
                date_deb: req.body.date_deb,
                date_fin: req.body.date_fin,
                reason: req.body.reason,
                departement: req.body.departement,
                position: req.body.position,
                employee: req.body.employee,
            })

            await conge.save()
            res.json({ conge })
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })

    router.patch("/empPart/:id", (req, res, next) => {
        Conge.findById(req.params.id)
            .then(conge => {
                conge.type= req.body.type,
                conge.date_deb= req.body.date_deb,
                conge.date_fin= req.body.date_fin,
                conge.reason= req.body.reason,
                conge.departement= req.body.departement,
                conge.employee= req.body.employee,
                conge.save()
                    .then(() => res.json('Request updated!'))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })

router.patch("/bossPart/:id", (req, res, next) => {
    Conge.findById(req.params.id)
        .then(conge => {
            conge.position = req.body.position
            conge.save()
                .then(() => res.json('Request updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid Modification' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Conge.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Request deleted'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
router.get("/:id", (req, res, next) => {
    const id = req.params.id
    Conge.findById(id)
        .populate('departement')
        .populate('employee')
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})
router.get("/", (req, res, next) => {
    
    Conge.find()
        .populate('departement')
        .populate('employee')
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})



module.exports = router