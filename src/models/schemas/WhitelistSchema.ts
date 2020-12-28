/* eslint-disable @typescript-eslint/camelcase */
import { Schema } from 'mongoose'

const WhitelistSchema = new Schema({
  game_tag: { type: String, unique: true },
  twitch_user: { type: String, unique: true },
  access_type: String,
  premium_account: Boolean,
  uuid: String,
  access_expiry_date: Date,
}, {
  timestamps: {
    createdAt: 'created_at' ,
    updatedAt: 'updated_at',
  },
})

export { WhitelistSchema }
