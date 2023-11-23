const config = require('../../config')

const router = require('express').Router()
const userRoutes = require('./users')

const { 
  viewIndex, 
  viewTryPremium, 
  viewDashboard
} = require('../controllers/view')

router.route('/login').all(userRoutes)
router.route('/register').all(userRoutes)

router.route('/').get(viewIndex)
router.route('/try-premium').get(viewTryPremium)

router.route('/dashboard').get(viewDashboard)

module.exports = router