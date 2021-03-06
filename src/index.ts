import { config } from 'dotenv'
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import { initCronJob } from './helpers/cronJob'
import { connectMongo } from './helpers/mongo'
import { connectLocalTunnel } from './helpers/localTunnel'
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
app.use(compression())

// Routes
app.use(WHITELIST_API_PREFIX, whitelistRoutes)

// Server is listening
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}.`)
})

// Expose using LocalTunnel
connectLocalTunnel()

// Server cronjob
initCronJob()
