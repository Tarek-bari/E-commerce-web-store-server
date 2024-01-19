const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    id: String,
    productId: String,
    productName: String,
    size: String,
    color: String,
    quantity: Number,
    livrationPrice: Number,
    totalPrice: Number,
    costomerName: String,
    phone: String,
    wilaya: String
})

module.exports = mongoose.model('Order', orderSchema)