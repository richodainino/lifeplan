const UserService = require('../services/users')

exports.login = async (req, res) => {
  try {
    const UserServiceInstance = new UserService()
    const {email, password} = req.body
    
    if (!email || !password) {
      req.session.flash = {
        message: 'Email and password are required',
        type: 'warning'
      }
      res.redirect('/login')
      return
    }
    
    const user = await UserServiceInstance.login(email, password)

    if (!user) {
      req.session.flash = {
        message: 'Invalid email or password',
        type: 'warning'
      }
      res.redirect('/login')
      return
    }

    req.session.isLoggedIn = true
    req.session.user = user
    res.redirect('/dashboard')
  }
  catch (e) {
    console.log(e)
    req.session.flash = {
      message: 'An error occurred',
      type: 'error'
    }
    res.redirect('/login')
  }
}

exports.register = async (req, res) => {
  try {
    const UserServiceInstance = new UserService()
    const {name, email, password, } = req.body
    
    if (!email || !password || !name) {
      req.session.flash = {
        message: 'Email, password, and name are required',
        type: 'warning'
      }
      res.redirect('/register')
      return
    }
    
    const user = await UserServiceInstance.register(email, password, name)

    if (!user) {
      req.session.flash = {
        message: 'Email already in use',
        type: 'warning'
      }
      res.redirect('/register')
      return
    }

    req.session.flash = {
      message: 'Account created successfully. Login to continue.',
      type: 'success'
    }
    res.redirect('/login')
  }
  catch (e) {
    console.log(e)
    req.session.flash = {
      message: 'An error occurred',
      type: 'error'
    }
    res.redirect('/register')
  }
}