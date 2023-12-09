const PlanRepository = require('../repositories/plan')

class PlanService {
  constructor () {
    this.planRepo = new PlanRepository()
  }

  async create (plan, user_id) {
    // TODO: Calculate priority points
    const priority_points = plan.life_impact + plan.people_impact + plan.activity_impact + plan.difficulty
    
    plan = {
      user_id,
      ...plan,
      priority_points
    }
    
    const newPlan = await this.planRepo.create(plan)
    if (!newPlan) throw new Error('Plan not created')

    return newPlan
  }

  async getById (id) {
    const plan = await this.planRepo.getById(id)
    if (!plan) throw new Error('Plan not found')

    return plan
  }

  async getAllByUserIdByDeadlineDate (user_id, date) {
    const plans = await this.planRepo.getAllByUserIdByDeadlineDate(user_id, date)
    if (!plans) throw new Error('Plans not found')

    return plans
  }

  async getAllByUserIdWithDirection (user_id, orderDirection) {
    const plans = await this.planRepo.getAllByUserIdWithDirection(user_id, orderDirection)
    if (!plans) throw new Error('Plans not found')

    return plans
  }

  async getAllDateByUserIdWithDirectionGroupByCreatedAt (user_id, orderDirection) {
    let plansDate = await this.planRepo.getAllDateByUserIdWithDirectionGroupByCreatedAt(user_id, orderDirection)
    if (!plansDate) throw new Error('Plans not found')

    plansDate.forEach(el => {
      const createdAt = new Date(el.date)
      const createdAtDate = createdAt.getDate()
      const createdAtMonth = createdAt.toLocaleString('default', { month: 'long' })
      const createdAtYear = createdAt.getFullYear()
      el.dateFormatted = createdAtDate + ' ' + createdAtMonth + ' ' + createdAtYear
    })

    return plansDate
  }

  async update (plan) {
    const updatedPlan = await this.planRepo.update(plan)
    if (!updatedPlan) throw new Error('Plan not updated')

    return updatedPlan
  }

  async delete (id) {
    const deletedPlan = await this.planRepo.delete(id)
    if (!deletedPlan) throw new Error('Plan not deleted')

    return deletedPlan
  }
}

module.exports = PlanService