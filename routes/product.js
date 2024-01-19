const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const verifyJwt = require('../middleware/verifyJwt')
const verifyRole = require('../middleware/verifyRole')


router.route('/')
    .get(productController.getAllProducts)
    .post(verifyJwt, verifyRole, productController.createNewProduct)
    .put(verifyJwt, verifyRole, productController.updateProduct)
    .delete(verifyJwt, verifyRole, productController.deleteProduct)


router.route('/:product_id')
    .get(productController.getProduct)

module.exports = router