import { config } from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { connectMongo } from './helpers/mongo'
import whitelistRoutes, { WHITELIST_API_PREFIX } from './routes/whitelist'

// Load environment variables from .env* files
config()

// Connect to mongo
// FIXME: this is async and might fail!
connectMongo()

// Create Express.js app
const app = express()

// Settings
app.set('port', process.env.PORT)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use(WHITELIST_API_PREFIX, whitelistRoutes)

// Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}.`)
})