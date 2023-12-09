const config = require('../config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres',
  define: {
    raw: true,
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user')(sequelize, Sequelize)
db.plans = require('./plan')(sequelize, Sequelize)

db.users.hasMany(db.plans, { foreignKey: 'user_id' })
db.plans.belongsTo(db.users, { foreignKey: 'user_id' })

module.exports = db