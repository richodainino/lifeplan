exports.viewIndex = async (req, res) => {
  res.render('pages/index.ejs')
}

exports.viewTryPremium = async (req, res) => {
  res.render('pages/try-premium.ejs')
}

exports.viewDashboard = async (req, res) => {
  const user = req.session.user ? req.session.user : null
  const flash = req.session.flash ? req.session.flash : null

  res.render('pages/dashboard.ejs', {
    user: user, 
    flash: flash
  })
}

exports.viewLogin = async (req, res) => {
  const flash = req.session.flash ? req.session.flash : null
  res.render('pages/login.ejs', {flash: flash})
}

exports.viewRegister = async (req, res) => {
  const flash = req.session.flash ? req.session.flash : null
  res.render('pages/register.ejs', {flash: flash})
}