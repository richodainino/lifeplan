const express = require('express')
const session = require('express-session')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')

const config = require('./config')
const routes = require('./app/routes')

const db = require('./app/models')
db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database is connected')
  })
  .catch((err) => {
    console.log('Failed connecting to database: ' + err.message)
  })

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}.`)
})