/* eslint-disable @typescript-eslint/camelcase */
import { Schema } from 'mongoose'

const WhitelistSchema = new Schema({
  game_tag: { type: String, trim: true, unique: true, sparse: true },
  twitch_user: { type: String, trim: true, unique: true, sparse: true },
  note: { type: String, trim: true},
  uuid: String,
  access_expiry_date: Date,
}, {
  timestamps: {
    createdAt: 'created_at' ,
    updatedAt: 'updated_at',
  },
})

export { WhitelistSchema }
