const dotenv = require('dotenv')
const envFound = dotenv.config()

if (envFound.error) {
  console.log("No .env file located. Using environment variables.")
}

const config = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  port: process.env.PORT || 8080,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV,
}

module.exports = config