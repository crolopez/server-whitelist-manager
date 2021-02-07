import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  game_tag: { type: string, unique: true },
  twitch_user: { type: string, unique: true },
  note: string,
  uuid: string,
  access_expiry_date: Date,
}
