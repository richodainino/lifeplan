const config = require('../config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPass, {
  host: config.dbHost,
  port: config.dbPort,
  dialect: 'postgres'
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user')(sequelize, Sequelize)

module.exports = db