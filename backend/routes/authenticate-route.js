const express = require('express')
const authenticateControllers = require('../controllers/authenticate-controller')

const router = express.Router()

router.post('/', authenticateControllers.validatePassword)

module.exports = router
