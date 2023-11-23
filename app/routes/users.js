const router = require('express').Router()

const { 
  viewLogin,
  viewRegister
} = require('../controllers/view')
const { 
  login,
  register
} = require('../controllers/users')

router.route('/login')
  .get(viewLogin)
  .post(login)

router.route('/register')
  .get(viewRegister)
  .post(register)

module.exports = router