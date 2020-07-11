const router = require('express').Router()
const controller = require('./controller')

// Get
router.get('/', controller.getProgrammes)

module.exports = router
