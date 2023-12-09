const router = require('express').Router()

const {
  viewDashboard,
  viewPlanForm,
  viewPlanDetail,
  viewSchedule,
  viewHistory,
  viewPackage,
  createPlan
} = require('../controllers/dashboard')

router.route('/')
  .get(viewDashboard)

router.route('/plan')
  .get(viewPlanForm)
  .post(createPlan)

router.route('/plan/:id')
  .get(viewPlanDetail)
  // .put(updatePlan)
  // .delete(deletePlan)

router.route('/schedule')
  .get(viewSchedule)

router.route('/history')
  .get(viewHistory)

router.route('/package')
  .get(viewPackage)

module.exports = router