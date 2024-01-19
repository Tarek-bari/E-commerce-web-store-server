const express = require('express')
const router = express.Router()
const accountController = require('../controller/accountController')
const verifyJwt = require('../middleware/verifyJwt')

router.route('/')
    .get(verifyJwt, accountController.getAllUsers)
    .put(verifyJwt, accountController.updateProfile)
    .delete(verifyJwt, accountController.deleteProfile)

router.route('/:id')
    .get(verifyJwt, accountController.getProfile)

module.exports = router    