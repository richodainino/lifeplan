const PlanService = require('../services/plan')

exports.viewDashboard = async (req, res) => {
  const user = req.user
  const date = new Date()

  const PlanServiceInstance = new PlanService()
  try {
    const plans = await PlanServiceInstance.getAllByUserIdByDeadlineDate(user.id, date)
    res.render('pages/dashboard', {user: user, plans: plans, date: date})
  }
  catch (err) {
    req.flash('error', 'Plans not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewPlanForm = (req, res) => {
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
  const id = req.params.id
  
  const PlanServiceInstance = new PlanService()
  try {
    const plan = await PlanServiceInstance.getById(id)

    if (plan.user_id !== user.id) {
      req.flash('error', 'Plan not found')
      res.redirect('/dashboard')
      return
    }

    plan.duration_hour = Math.floor(plan.duration / 60)
    plan.duration_minute = plan.duration % 60;

    res.render('pages/dashboard/plan-detail.ejs', {user: user, plan: plan})
  }
  catch (err) {
    req.flash('error', 'Plan not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewSchedule = async (req, res) => {
  const user = req.user

  res.render('pages/dashboard/schedule.ejs', {user: user})
}

exports.viewHistory = async (req, res) => {
  const user = req.user

  const PlanServiceInstance = new PlanService()
  try {
    const plans = await PlanServiceInstance.getAllByUserIdWithDirection(user.id, 'DESC')
    const plansDate = await PlanServiceInstance.getAllDateByUserIdWithDirectionGroupByCreatedAt(user.id, 'DESC')
    res.render('pages/dashboard/history.ejs', {user: user, plans: plans, plansDate: plansDate})
  }
  catch (err) {
    req.flash('error', 'Plans not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewPackage = (req, res) => {
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

  const duration = parseInt(duration_hour) * 60 + parseInt(duration_minute)
  
  const plan = {
    title: title,
    description: description,
    duration: duration,
    deadline: deadline,
    life_impact: parseInt(life_impact),
    people_impact: parseInt(people_impact),
    activity_impact: parseInt(activity_impact),
    difficulty: parseInt(difficulty)
  }

  const PlanServiceInstance = new PlanService()
  try {
    const newPlan = await PlanServiceInstance.create(plan, req.user.id)
    res.redirect('/dashboard/plan/' + newPlan.id)
  }
  catch (err) {
    req.flash('error', 'Plan not created')
    res.redirect('/dashboard/plan')
    return
  }
}