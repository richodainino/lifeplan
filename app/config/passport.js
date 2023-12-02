const db = require('../models')
const User = db.users
const bcrypt = require('../helpers/bcrypt.js')

async function register(req, email, password, done) {
  try {
    const user = await User.findOne({ where: { email: email }})
    
    if (user) {
      return done(null, false, { message: 'That email is already taken' })
    } 

    const hashedPassword = bcrypt.hashPassword(password)
    const data = {
      email: email,
      password: hashedPassword,
      name: req.body.name
    }
    
    const newUser = await User.create(data)

    if (!newUser) {
      return done(null, false, { message: '10212 - Something went wrong' })
    }

    return done(null, newUser)
  } 
  catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errMsg = err.errors[0].message
      return done(null, false, { message: errMsg })
    }

    return done(err, false, { message: '10211 - Something went wrong' })
  }
}

async function login(req, email, password, done) {
  try {
    const user = await User.findOne({ where: { email: email }})

    if (!user) {
      return done(null, false, { message: 'Email or password is incorrect' })
    }

    const isPasswordValid = bcrypt.comparePassword(password, user.password)
    
    if (!isPasswordValid) {
      return done(null, false, { message: 'Email or password is incorrect' })
    } 

    return done(null, user)
  }
  catch (err) {
    return done(err, false, { message: '10221 - Something went wrong' })
  }
}

module.exports = (passport) => {
  const LocalStrategy = require('passport-local').Strategy

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)

      if (!user) {
        return done(user.errors, false)
      }

      return done(null, user)
    }
    catch (err) {
      return done(err, false, { message: '10201 - Something went wrong' })
    }
  })

  passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, register))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, login))
}