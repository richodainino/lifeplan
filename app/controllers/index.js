exports.viewIndex = async (req, res) => {
  res.render('pages/index.ejs')
}

exports.viewTryPremium = async (req, res) => {
  res.render('pages/try-premium.ejs')
}