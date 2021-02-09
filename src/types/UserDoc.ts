import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  game_tag: { type: string, unique: true },
  twitch_user: { type: string, unique: true },
  note: { type: string, trim: true},
  uuid: string,
  access_expiry_date: Date,
}
