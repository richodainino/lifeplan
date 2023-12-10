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
  
  async getAllByUserIdCalendarFormatted (user_id) {
    const plansObject = await this.planRepo.getAllByUserId(user_id)
    if (!plansObject) throw new Error('Plans not found')

    let plansFormatted = []
    plansObject.forEach(el => {
      plansFormatted.push({
        start : new Date(el.deadline),
        title : el.title,
        url : '/dashboard/plan/' + el.id
      })
    })

    return plansFormatted
  }

  async getAllByUserIdAndDeadlineDate (user_id, date) {
    const plans = await this.planRepo.getAllByUserIdAndDeadlineDate(user_id, date)
    if (!plans) throw new Error('Plans not found')

    return plans
  }  

  async getAllByUserIdWithDirectionGroupByCreatedAt (user_id, orderDirection) {
    const plans = await this.planRepo.getAllByUserIdWithDirection(user_id, orderDirection)
    if (!plans) throw new Error('Plans not found')

    let plansGroupByDate = await this.planRepo.getAllDateByUserIdWithDirectionGroupByCreatedAt(user_id, orderDirection)
    if (!plansGroupByDate) throw new Error('Plans date not found')

    plansGroupByDate.forEach(el => {
      const createdAt = new Date(el.date)
      
      const createdAtDate = createdAt.getDate()
      const createdAtMonth = createdAt.toLocaleString('default', { month: 'long' })
      const createdAtYear = createdAt.getFullYear()
      el.dateFormatted = createdAtDate + ' ' + createdAtMonth + ' ' + createdAtYear

      el.plans = plans.filter(plan => plan.createdAt.toISOString().split('T')[0] === createdAt.toISOString().split('T')[0])
    })

    return plansGroupByDate
  }

  async updateById (plan, id) {
    const updatedPlan = await this.planRepo.updateById(plan, id)
    if (!updatedPlan) throw new Error('Plan not updated')

    return updatedPlan
  }

  async deleteById (id) {
    const deletedPlan = await this.planRepo.deleteById(id)
    if (!deletedPlan) throw new Error('Plan not deleted')

    return deletedPlan
  }
}

module.exports = PlanService