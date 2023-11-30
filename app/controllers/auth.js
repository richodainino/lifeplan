const AuthService = require('../services/auth')

exports.viewLogin = async (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/dashboard')
    return
  }

  let flash = req.session.flash
  if (req.session.flash) {
    flash.ttl -= 1
    if (flash.ttl <= 0) flash = null
    else flash = req.session.flash
  }
  else {
    flash = null
  }

  res.render('pages/login.ejs', {flash: flash})
}

exports.viewRegister = async (req, res) => {
  if (req.session.isLoggedIn) {
    res.redirect('/dashboard')
    return
  }

  let flash = req.session.flash
  if (req.session.flash) {
    flash.ttl -= 1
    if (flash.ttl <= 0) flash = null
    else flash = req.session.flash
  }
  else {
    flash = null
  }

  res.render('pages/register.ejs', {flash: flash})
}

exports.login = async (req, res) => {
  try {
    const AuthServiceInstance = new AuthService()
    const {email, password} = req.body
    
    if (!email || !password) {
      req.session.flash = {
        message: 'Email and password are required',
        type: 'warning',
        ttl: 2
      }
      res.redirect('/login')
      return
    }
    
    const user = await AuthServiceInstance.login(email, password)

    if (!user) {
      req.session.flash = {
        message: 'Invalid email or password',
        type: 'warning',
        ttl: 2
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
      type: 'error',
      ttl: 2
    }
    res.redirect('/login')
  }
}

exports.register = async (req, res) => {
  try {
    const AuthServiceInstance = new AuthService()
    const {name, email, password, } = req.body
    
    if (!email || !password || !name) {
      req.session.flash = {
        message: 'Email, password, and name are required',
        type: 'warning',
        ttl: 2
      }
      res.redirect('/register')
      return
    }
    
    const user = await AuthServiceInstance.register(email, password, name)

    if (!user) {
      req.session.flash = {
        message: 'Email already in use',
        type: 'warning',
        ttl: 2
      }
      res.redirect('/register')
      return
    }

    req.session.flash = {
      message: 'Account created successfully. Login to continue.',
      type: 'success',
      ttl: 2
    }
    res.redirect('/login')
  }
  catch (e) {
    console.log(e)
    req.session.flash = {
      message: 'An error occurred',
      type: 'error',
      ttl: 2
    }
    res.redirect('/register')
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login')
}