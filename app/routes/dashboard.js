const router = require('express').Router()

const {
  viewDashboard,
  viewPlanForm,
  viewPlanDetail,
  viewPlanEdit,
  viewSchedule,
  viewHistory,
  viewPackage,
  createPlan,
  updatePlan,
  deletePlan
} = require('../controllers/dashboard')

router.route('/')
  .get(viewDashboard)

router.route('/plan')
  .get(viewPlanForm)
  .post(createPlan)

router.route('/plan/:id')
  .get(viewPlanDetail)
  
router.route('/plan/:id/edit')
  .get(viewPlanEdit)
  .post(updatePlan)

router.route('/plan/:id/delete')
  .get(deletePlan)

router.route('/schedule')
  .get(viewSchedule)

router.route('/history')
  .get(viewHistory)

router.route('/package')
  .get(viewPackage)

module.exports = router