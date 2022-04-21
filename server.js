const express = require("express")
//const jwt = require('jsonwebtoken');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
//routes
const ManageEmployee = require("./routes/ManageEmployee")
const ManageDepartement = require("./routes/ManageDepartement")
const ManageConge = require("./routes/ManageConge")

//connect to db
connectDB()

//mdleware
app.use(cors())
app.use(express.json({extended: true}))
app.use(morgan('dev'))
app.use('/uploads/', express.static('uploads'))

//user routers
app.use("/ManageEmployee", ManageEmployee)
app.use("/ManageDepartement", ManageDepartement)
app.use("/ManageConge", ManageConge)


app.use((req, res, next) => {
    const error = new Error('Not found')
    console.log(error)
    error.status = 404
    next(error)
})
 
app.use((error, req, res, next) => {
    
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));