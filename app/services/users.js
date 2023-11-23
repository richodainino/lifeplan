const db = require('../models')
const User = db.users
const bcrypt = require('../helpers/bcrypt')

class UserService {
  constructor () {
    this.userModel = User
  }

  async login (email, passwordPlaintext) {
    const user = await this.userModel.findOne({ where: { email: email } })
    if (!user) {
      return null
    }

    if (!bcrypt.comparePassword(passwordPlaintext, user.password)) {
      return null
    }

    return user
  }

  async register (email, password, name) {
    const user = await this.userModel.findOne({ where: { email: email } })
    if (user) {
      return null
    }

    const hashedPassword = bcrypt.hashPassword(password)

    const newUser = await this.userModel.create({ email: email, password: hashedPassword, name: name })
    return newUser
  }
}

module.exports = UserService