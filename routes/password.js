const express = require('express')
const router = express.Router()
const passwordController = require('../controller/passwordController')
const verifyJwt = require('../middleware/verifyJwt')


router.post('/resetpassword/sendemail', passwordController.sendMsg)
router.post('/resetpassword/verify', passwordController.verifyMsgAndCreateNewPassword)



router.put('/changepassword', verifyJwt, passwordController.changePassword)


module.exports = router