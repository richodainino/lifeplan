const PlanService = require('../services/plan')

exports.viewDashboard = async (req, res) => {
  let flash = {
    message: req.flash('error'),
    type: 'warning',
    shape: 'rounded',
  }
  if (flash.message.length === 0) flash = null

  const user = req.user
  const today = new Date()

  const PlanServiceInstance = new PlanService()
  try {
    const plans = await PlanServiceInstance.getAllByUserIdAndDeadlineDate(user.id, today)
    res.render('pages/dashboard', {user: user, plans: plans, date: today, flash: flash})
  }
  catch (err) {
    req.flash('error', 'Plans not found')
    res.redirect('/')
    return
  }
}

exports.viewPlanForm = async (req, res) => {
  let flash = {
    message: req.flash('error'),
    type: 'warning',
  }
  if (flash.message.length === 0) flash = null

  const user = req.user
  const today = new Date()

  const PlanServiceInstance = new PlanService()
  try {
    const plans = await PlanServiceInstance.getAllByUserIdAndCreatedDate(user.id, today)

    if (user.role === 'free' && plans.length >= 4) {
      req.flash('error', 'You have exceeded the limit of creating 5 plans today')
      res.redirect('/dashboard')
      return
    }

    res.render('pages/dashboard/create-plan.ejs', {user: user, flash: flash})
  }
  catch (err) {
    req.flash('error', 'Plan not found')
    res.redirect('/dashboard')
    return
  }
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
    plan.duration_minute = plan.duration % 60

    res.render('pages/dashboard/plan-detail.ejs', {user: user, plan: plan})
  }
  catch (err) {
    req.flash('error', 'Plan not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewPlanEdit = async (req, res) => {
  const user = req.user
  const id = req.params.id

  let flash = {
    message: req.flash('error'),
    type: 'warning',
  }
  if (flash.message.length === 0) flash = null
  
  const PlanServiceInstance = new PlanService()
  try {
    const plan = await PlanServiceInstance.getById(id)

    if (plan.user_id !== user.id) {
      req.flash('error', 'Plan not found')
      res.redirect('/dashboard')
      return
    }

    plan.duration_hour = Math.floor(plan.duration / 60)
    plan.duration_minute = plan.duration % 60

    const deadlineWithAddedHours = plan.deadline
    deadlineWithAddedHours.setHours(deadlineWithAddedHours.getHours() + 7)
    plan.deadline_formatted = deadlineWithAddedHours.toISOString().slice(0, 16)

    res.render('pages/dashboard/edit-plan.ejs', {user: user, plan: plan, flash: flash})
  }
  catch (err) {
    req.flash('error', 'Plan not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewSchedule = async (req, res) => {
  const user = req.user

  const PlanServiceInstance = new PlanService()
  try {
    const plans = await PlanServiceInstance.getAllByUserIdCalendarFormatted(user.id)
    res.render('pages/dashboard/schedule.ejs', {user: user, plans: plans})
  }
  catch (err) {
    req.flash('error', 'Plans not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewHistory = async (req, res) => {
  const user = req.user
  if (user.role !== 'premium') {
    res.redirect('/premium')
    return
  }

  const PlanServiceInstance = new PlanService()
  try {
    const plansGroupByDate = await PlanServiceInstance.getAllByUserIdWithDirectionGroupByCreatedAt(user.id, 'DESC')
    res.render('pages/dashboard/history.ejs', {user: user, plansGroupByDate: plansGroupByDate})
  }
  catch (err) {
    req.flash('error', 'Plans not found')
    res.redirect('/dashboard')
    return
  }
}

exports.viewPackage = (req, res) => {
  const user = req.user
  if (user.role !== 'premium') {
    res.redirect('/premium')
    return
  }

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

exports.updatePlan = async (req, res) => {
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
    const updatedPlan = await PlanServiceInstance.updateById(plan, req.params.id)
    res.redirect('/dashboard/plan/' + req.params.id)
  }
  catch (err) {
    req.flash('error', 'Plan not updated')
    res.redirect('/dashboard/plan/' + req.params.id + '/edit')
    return
  }
}

exports.deletePlan = async (req, res) => {
  const PlanServiceInstance = new PlanService()
  try {
    const deletedPlan = await PlanServiceInstance.deleteById(req.params.id)
    res.redirect('/dashboard')
  }
  catch (err) {
    req.flash('error', 'Plan not deleted')
    res.redirect('/dashboard/plan/' + req.params.id)
    return
  }
}