import mongoose from 'mongoose'
import { WhitelistSchema } from './schemas/WhitelistSchema'
import { whiteListPostSaveMiddleware } from './middlewares/whitelist'
import { UserDoc } from '../types/UserDoc'

// Middlewares
WhitelistSchema.post('save', whiteListPostSaveMiddleware)

// The model
export default mongoose.model<UserDoc>('Whitelist', WhitelistSchema)
