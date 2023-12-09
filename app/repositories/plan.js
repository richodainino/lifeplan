const db = require('../models')
const Plan = db.plans
const Op = db.Op
const sequelize = db.sequelize

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

  async getAllByUserIdByDeadlineDate (user_id, date) {
    try {
      const plansModel = await this.planModel.findAll({ 
        where: {
          user_id: user_id,
          deadline: {
            [Op.gte]: date.setHours(0,0,0,0),
            [Op.lte]: date.setHours(23,59,59,999)
          }
        }
      })
      const plans = plansModel.map(el => el.get({ plain: true }))
      return plans
    }
    catch (err) {
      console.log("Repository plan getAllByUserIdByDeadlineDate error: ", err)
      return null
    }
  }

  async getAllByUserIdWithDirection (user_id, orderDirection) {
    try {
      const plansModel = await this.planModel.findAll({ 
        where: { user_id: user_id },
        order: sequelize.literal('"plans"."createdAt" ' + orderDirection)
      })
      const plans = plansModel.map(el => el.get({ plain: true }))
      return plans
    }
    catch (err) {
      console.log("Repository plan getAllByUserIdWithDirection error: ", err)
      return null
    }
  }

  async getAllDateByUserIdWithDirectionGroupByCreatedAt (user_id, orderDirection) {
    try {
      const plansModel = await this.planModel.findAll({ 
        where: { user_id: user_id },
        attributes: [
          [sequelize.literal(`DATE("createdAt")`), 'date'],
          [sequelize.literal(`COUNT(*)`), 'count']
        ],
        group: ['date'],
        order: sequelize.literal('"date" ' + orderDirection)
      })
      const plans = plansModel.map(el => el.get({ plain: true }))
      return plans
    }
    catch (err) {
      console.log("Repository plan getAllDateByUserIdWithDirectionGroupByCreatedAt error: ", err)
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