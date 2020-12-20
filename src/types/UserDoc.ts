import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  game_user: { type: string, unique: true },
  twitch_user: { type: string, unique: true },
  access_type: string,
  premium_account: boolean,
  uuid: string,
  access_expiry_date: Date,
}
