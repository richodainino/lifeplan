exports.viewIndex = async (req, res) => {
  res.render('pages/index.ejs')
}

exports.viewTryPremium = async (req, res) => {
  const user = req.user
  if (user && user.role === 'premium') {
    res.redirect('/dashboard/package')
    return
  }

  res.render('pages/premium.ejs', {user: user})
}