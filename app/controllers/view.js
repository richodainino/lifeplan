exports.viewIndex = async (req, res) => {
  res.render('pages/index.ejs')
}

exports.viewTryPremium = async (req, res) => {
  res.render('pages/try-premium.ejs')
}

exports.viewDashboard = async (req, res) => {
  const sessionIsLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false
  const user = sessionIsLoggedIn ? req.session.user : null
  
  let flash = req.session.flash
  if (req.session.flash) {
    flash.ttl -= 1
    if (flash.ttl <= 0) flash = null
    else flash = req.session.flash
  }
  else {
    flash = null
  }

  if (!sessionIsLoggedIn) return res.redirect('/login')

  res.render('pages/dashboard.ejs', {
    user: user, 
    flash: flash
  })
}

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