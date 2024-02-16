const express = require('express')
const router = express.Router()
const accountController = require('../controller/accountController')
const verifyJwt = require('../middleware/verifyJwt')
const verifyRole = require('../middleware/verifyRole')

router.route('/')
    .get(verifyJwt, verifyRole, accountController.getAllUsers)
    .put(verifyJwt, accountController.updateProfile)
    .delete(verifyJwt, accountController.deleteProfile)

router.route('/:id')
    .get(verifyJwt, accountController.getProfile)

module.exports = router    