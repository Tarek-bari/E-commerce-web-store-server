const Order = require('../model/order')
const Product = require('../model/product')
const crypto = require('crypto')


// get all orders
const getAllOrders = async (req, res) => {
    const orders = await Order.find()
    if (!orders || orders.length === 0) return res.sendStatus(204)
    res.status(200).json({ status: 'success', data: orders })
}


// get spesific oredres for one product
const getOrdersOfProduct = async (req, res) => {
    if (!req?.query?.productId) return res.status(400).json({ status: 'fail', data: { Message: 'product id required' } })
    const orders = await Order.find({ productId: req.query.productId })
    if (orders.length === 0) return res.sendStatus(204)
    res.status(200).json({ status: 'success', data: orders })
}

// get order
const getOrder = async (req, res) => {
    if (!req?.params?.order_id) return res.status(400).json({ status: 'fail', data: { Message: 'Order id required' } })
    const order = await Order.findOne({ id: req.params.order_id })
    if (!order) return res.sendStatus(204)
    res.status(200).json({ status: 'success', data: order })
}

// delete order
const deleteOrder = async (req, res) => {
    if (!req?.body?.order_id) return res.status(400).json({ status: 'fail', data: { Message: 'Order id required' } })
    const order = await Order.findOne({ id: req.body.order_id })
    if (!order) return res.sendStatus(204)
    const result = await order.deleteOne()
    res.json({ status: 'success', data: result })
}

// Post Order controller for customers
const orderProduct = async (req, res) => {
    const { id, color, size, quantity, fname, lname, address, wilaya, phone, city, livrationPrice } = req.body
    if (!id || !color || !size || !quantity || !fname || !lname || !address || !wilaya || !phone || !city) {
        return res.status(400).json({ status: "fail", data: { Message: "all params are required" } })
    }

    const product = await Product.findOne({ id: id })
    if (!product) return res.sendStatus(204)
    // email 
    /*
    Packege: Emailjs,
    prductName, size, color, quantity, cosntomerName, address, wilaya, phone, city
    Action: Send email to the email owner of website with previous params. 
    Sender: Form not email from customer in FRONT_END project
     */
    const total = (quantity * product.price) + livrationPrice
    const order = await Order.create({
        "id": crypto.randomUUID(),
        "productId": product.id,
        "productName": product.title,
        "size": size,
        "color": color,
        "quantity": quantity,
        "livrationPrice": livrationPrice,
        "totalPrice": total,
        "costomerName": `${fname} ${lname}`,
        "phone": phone,
        "wilaya": wilaya
    })

    res.status(201).json({ status: "success", data: order })


}

module.exports = { orderProduct, getAllOrders, getOrder, deleteOrder, getOrdersOfProduct }