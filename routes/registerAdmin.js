const express = require('express')
const router = express.Router()
const registerAdminController = require('../controller/registerAdminController')

router.post('/', registerAdminController.handleNewAdmin)

module.exports = router