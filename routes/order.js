const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController')
const verifyJwt = require('../middleware/verifyJwt')
const verifyRole = require('../middleware/verifyRole')


router.route('/')
    .get(verifyJwt, verifyRole, orderController.getAllOrders)
    .post(orderController.orderProduct)
    .delete(verifyJwt, verifyRole, orderController.deleteOrder)


// route for orders of specific product    
router.route('/product')
    .get(verifyJwt, verifyRole, orderController.getOrdersOfProduct)


router.route('/:order_id')
    .get(verifyJwt, verifyRole, orderController.getOrder)

module.exports = router