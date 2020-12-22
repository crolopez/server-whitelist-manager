import mongoose from 'mongoose'
import { WhitelistSchema } from './schemas/WhitelistSchema'
import { WhiteListMiddleware } from './middlewares/whitelist'
import { UserDoc } from '../types/UserDoc'

// Middlewares
WhitelistSchema.post('save', WhiteListMiddleware.WhiteListPostSaveMiddleware)
WhitelistSchema.post('findOneAndUpdate', function(result) {
  console.log('===postfindOneAndUpdate===%s==', result)
});

// The model
export default mongoose.model<UserDoc>('Whitelist', WhitelistSchema)
