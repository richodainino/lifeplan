const router = require('express').Router()

const { 
  viewLogin,
  viewRegister
} = require('../controllers/view')
const { 
  login,
  register,
  logout
} = require('../controllers/users')

router.route('/login')
  .get(viewLogin)
  .post(login)

router.route('/register')
  .get(viewRegister)
  .post(register)

router.route('/logout')
  .get(logout)

module.exports = router