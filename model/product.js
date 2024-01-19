const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    id: String,
    images: {
        type: [String],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    colors: {
        type: [String],
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        require: true
    },
    notice: [
        {
            rate: Number,
            text: String,
            name: String,
            email: String
        }
    ],
})

module.exports = mongoose.model('Product', productSchema)