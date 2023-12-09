const db = require('../models')
const Plan = db.plans

class PlanRepository {
  constructor () {
    this.planModel = Plan
  }

  async create (plan) {
    try {
      const newPlan = await this.planModel.create(plan)
      return newPlan
    } 
    catch (err) {
      console.log("Repository plan create error: ", err)
      return null
    }
  }

  async getById (id) {
    try {
      const plan = await this.planModel.findOne({ where: { id: id } })
      return plan
    }
    catch (err) {
      console.log("Repository plan getById error: ", err)
      return null
    }
  }

  async getAllByUserId (user_id) {
    try {
      const plansModel = await this.planModel.findAll({ where: { user_id: user_id } })
      const plans = plansModel.map(el => el.get({ plain: true }))
      return plans
    }
    catch (err) {
      console.log("Repository plan getAllByUserId error: ", err)
      return null
    }
  }

  async update (plan) {
    try {
      const updatedPlan = await this.planModel.update(plan, { where: { id: plan.id } })
      return updatedPlan
    }
    catch (err) {
      console.log("Repository plan update error: ", err)
      return null
    }
  }

  async delete (id) {
    try {
      const deletedPlan = await this.planModel.destroy({ where: { id: id } })
      return deletedPlan
    }
    catch (err) {
      console.log("Repository plan delete error: ", err)
      return null
    }
  }
}

module.exports = PlanRepository