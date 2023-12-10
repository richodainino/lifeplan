const passport = require('passport')

exports.viewLogin = (req, res) => {
  let flash = {
    message: req.flash('error'),
    type: 'warning',
  }
  if (flash.message.length === 0) flash = null

  res.render('pages/login.ejs', {flash: flash})
}

exports.viewRegister = (req, res) => {
  let flash = {
    message: req.flash('error'),
    type: 'warning',
  }
  if (flash.message.length === 0) flash = null

  res.render('pages/register.ejs', {flash: flash})
}

exports.login = (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
}

exports.register = (req, res, next) => {
  passport.authenticate('local-register', {
    successRedirect: '/dashboard',
    failureRedirect: '/register',
    failureFlash: true
  })(req, res, next)
}

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
    }

    res.redirect('/login')
  })
}