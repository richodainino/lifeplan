const path = require('path')
const express = require('express')
const session = require('express-session')
const passport = require('passport');

const config = require('./app/config')
const db = require('./app/models');
const routes = require('./app/routes')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app/views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())

// db.sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Database is connected')
//   })
//   .catch((err) => {
//     console.log('Failed connecting to database: ' + err.message)
//   })

app.use('/', routes)

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}.`)
})