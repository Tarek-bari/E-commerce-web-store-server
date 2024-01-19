const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    refreshToken: [String]
})

module.exports = mongoose.model('Admin', adminSchema)