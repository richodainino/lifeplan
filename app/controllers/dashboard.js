exports.viewDashboard = async (req, res) => {
  const sessionIsLoggedIn = req.session.isLoggedIn ? req.session.isLoggedIn : false
  // const user = sessionIsLoggedIn ? req.session.user : null

  // TODO: Uncomment this when you're ready to implement authentication
  // if (!sessionIsLoggedIn) return res.redirect('/login')
  const user = {
    name: 'John Doe'
  }

  res.render('pages/dashboard', {user: user})
}

exports.viewDashboardPlan = async (req, res) => {
  let flash = req.session.flash
  if (req.session.flash) {
    flash.ttl -= 1
    if (flash.ttl <= 0) flash = null
    else flash = req.session.flash
  }
  else {
    flash = null
  }

  const user = {
    name: 'John Doe'
  }

  res.render('pages/dashboard/plan.ejs', {user: user, flash: flash})
}

exports.viewDashboardSchedule = async (req, res) => {
  const user = {
    name: 'John Doe'
  }

  res.render('pages/dashboard/schedule.ejs', {user: user})
}

exports.viewDashboardHistory = async (req, res) => {
  const user = {
    name: 'John Doe'
  }

  res.render('pages/dashboard/history.ejs', {user: user})
}

exports.viewDashboardPackage = async (req, res) => {
  const user = {
    name: 'John Doe'
  }

  res.render('pages/dashboard/package.ejs', {user: user})
}

exports.createPlan = async (req, res) => {
  // const { 
  //   planName,
  //   planPrice,
  //   planDuration,
  //   planDescription
  // } = req.body

  console.log(req.body)
  res.redirect('/dashboard')
}