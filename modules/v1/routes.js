const router = require('express').Router()

/**
 * Use the modules routes. It's safer doing in a separate file than magically, to
 * be sure nester routes will be applied correctly.
 */
router.use('/epg', require('./epg/routes'))

router.post('/test', (req, res) => {
  res.status(200).json(req.headers)
})

// Return router
module.exports = router
