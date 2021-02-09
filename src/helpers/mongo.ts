import { MongoErrorMessage } from './messages'
import mongoose from 'mongoose'

async function connectMongo (): Promise<void> {
  try {
    if (!process.env.MONGO_DB) {
      throw new Error(MongoErrorMessage.MONGO_DB_MISSING)
    }
    await mongoose.connect(
      process.env.MONGO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    console.log(`mongodb connected (${process.env.MONGO_DB})`)
  } catch (error) {
    console.error(error)
    process.exit(-1)
  }
}

export { connectMongo }
