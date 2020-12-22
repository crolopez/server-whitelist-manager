import mongoose from 'mongoose'
import { WhitelistSchema } from './schemas/WhitelistSchema'
import { UserDoc } from '../types/UserDoc'

// The model
export default mongoose.model<UserDoc>('Whitelist', WhitelistSchema)
