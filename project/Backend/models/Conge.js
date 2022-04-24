const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseUniqueValidator = require('mongoose-unique-validator')
const formSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    
    type: {
        type: String,
        required: true
    },
    date_deb:{
        type:String,
        required: true
    },
    date_fin:{
        type:String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    departement: {
        type: Schema.Types.ObjectId,
        ref: 'departements'
    },
    position: {
        type: String,
        default: "Not Treated Yet"
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'employees'
    },
    dateCreated: {
        type: Date, 
        default: Date.now
    }
    
})
formSchema.plugin(mongooseUniqueValidator)
module.exports = mongoose.model('conge', formSchema)