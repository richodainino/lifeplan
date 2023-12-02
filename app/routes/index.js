const router = require('express').Router()
const authRoutes = require('./auth')
const dashboardRoutes = require('./dashboard')

const { 
  viewIndex, 
  viewTryPremium, 
} = require('../controllers')

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.route('/').get(viewIndex)
router.route('/try-premium').get(viewTryPremium)

router.route('/login').all(authRoutes)
router.route('/register').all(authRoutes)
router.route('/logout').all(authRoutes)

router.use('/dashboard', isLoggedIn, dashboardRoutes)

module.exports = router