const express = require('express')
const router = express.Router()
const adminControl = require('../Controller/admin.controller')

router.post('/login', adminControl.loginController)

module.exports = router