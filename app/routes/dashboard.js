const router = require('express').Router()

const {
  viewDashboard,
  viewDashboardPlan,
  viewDashboardSchedule,
  viewDashboardHistory,
  viewDashboardPackage,
  createPlan
} = require('../controllers/dashboard')

router.route('/')
  .get(viewDashboard)

router.route('/plan')
  .get(viewDashboardPlan)
  .post(createPlan)

router.route('/schedule')
  .get(viewDashboardSchedule)

router.route('/history')
  .get(viewDashboardHistory)

router.route('/package')
  .get(viewDashboardPackage)

module.exports = router