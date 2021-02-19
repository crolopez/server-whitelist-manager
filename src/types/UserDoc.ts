import mongoose from 'mongoose'

export interface UserDoc extends mongoose.Document {
  game_tag: { type: string, unique: true, sparse: true },
  twitch_user: { type: string },
  discord_user: { type: string },
  note: { type: string, trim: true},
  uuid: string,
  access_expiry_date: Date,
}
