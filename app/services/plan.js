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

  async getAllByUserId (user_id) {
    const plans = await this.planRepo.getAllByUserId(user_id)
    if (!plans) throw new Error('Plans not found')

    return plans
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