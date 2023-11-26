const router = require('express').Router()
const userRoutes = require('./users')
const dashboardRoutes = require('./dashboard')

const { 
  viewIndex, 
  viewTryPremium, 
} = require('../controllers')

router.route('/').get(viewIndex)
router.route('/try-premium').get(viewTryPremium)

router.route('/login').all(userRoutes)
router.route('/register').all(userRoutes)
router.route('/logout').all(userRoutes)

router.use('/dashboard', dashboardRoutes)

module.exports = router