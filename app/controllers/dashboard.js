exports.viewDashboard = async (req, res) => {
  const user = req.user
  res.render('pages/dashboard', {user: user})
}

exports.viewPlan = async (req, res) => {
  let flash = {
    message: req.flash('error'),
    type: 'warning',
  }
  if (flash.message.length === 0) flash = null

  const user = req.user

  res.render('pages/dashboard/plan.ejs', {user: user, flash: flash})
}

exports.viewPlanDetail = async (req, res) => {
  const user = req.user

  const { id } = req.params;

  res.render('pages/dashboard/plan-detail.ejs', {user: user, id: id})
}

exports.viewSchedule = async (req, res) => {
  const user = req.user

  res.render('pages/dashboard/schedule.ejs', {user: user})
}

exports.viewHistory = async (req, res) => {
  const user = req.user

  res.render('pages/dashboard/history.ejs', {user: user})
}

exports.viewPackage = async (req, res) => {
  const user = req.user

  res.render('pages/dashboard/package.ejs', {user: user})
}

exports.createPlan = async (req, res) => {
  const { 
    title,
    description,
    'duration-hour': duration_hour,
    'duration-minute': duration_minute,
    deadline,
    'life-impact': life_impact,
    'people-impact': people_impact,
    'activity-impact': activity_impact,
    difficulty
  } = req.body

  const user = req.user

  const duration = parseInt(duration_hour) * 60 + parseInt(duration_minute)
  
  const plan = {
    title: title,
    description: description,
    duration_hour: duration_hour,
    duration_minute: duration_minute,
    deadline: deadline,
    life_impact: life_impact,
    people_impact: people_impact,
    activity_impact: activity_impact,
    difficulty: difficulty
  }

  // res.redirect('/dashboard/plan/1')
  res.render('pages/dashboard/plan-detail.ejs', {user: user, plan: plan})
}