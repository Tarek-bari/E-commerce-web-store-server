const Product = require('../model/product')
const Order = require('../model/order')
const crypto = require('crypto')


const getAllProducts = async (req, res) => {
    const products = await Product.find()
    if (!products || products.length === 0) return res.sendStatus(204)
    res.status(200).json({ status: "success", data: products })
}

const getProduct = async (req, res) => {
    if (!req?.params?.product_id) return res.status(400).json({ status: 'fail', data: { Message: "Product id is required" } })
    const product = await Product.findOne({ id: req.params.product_id })
    if (!product) return res.sendStatus(204)
    res.status(200).json({ status: "success", data: product })
}


const createNewProduct = async (req, res) => {
    const { images, title, price, colors, size, category } = req.body
    if (!images || !title || !price || !colors || !size || !category) return res.status(400).json({ status: 'fail', data: { Message: "All params are required" } })

    try {
        const result = await Product.create({
            "id": crypto.randomUUID(),
            "images": images,
            "title": title,
            "price": price,
            "colors": colors,
            "size": size,
            "category": category
        })
        res.status(201).json({ status: "success", data: result })
    } catch (error) {
        res.status(500).json({ status: 'fail', data: error.Message })
    }
}

const updateProduct = async (req, res) => {

    if (!req.body?.product_id) return res.status(400).json({ status: 'fail', data: { Message: "Product id is required" } })

    const product = await Product.findOne({ id: req.body.product_id })
    if (!product) return res.sendStatus(204)

    if (req.body?.images) product.images = req.body.images
    if (req.body?.title) product.title = req.body.title
    if (req.body?.price) product.price = req.body.price
    if (req.body?.colors) product.colors = req.body.colors
    if (req.body?.size) product.size = req.body.size
    if (req.body?.category) product.category = req.body.category

    await product.save()
    res.json({ status: "success", data: product })
}


const deleteProduct = async (req, res) => {
    if (!req.body?.product_id) return res.status(400).json({ status: 'fail', data: { Message: "Product id is required" } })
    const product = await Product.findOne({ id: req.body.product_id })
    if (!product) return res.sendStatus(204)

    await product.deleteOne()
    res.json({ status: 'success', data: "Product deleted" })
}



module.exports = {
    getAllProducts,
    getProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
}