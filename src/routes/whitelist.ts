import express from 'express'
import moment from 'moment'
import Whitelist from '../models/Whitelist'
import { APIMessage } from '../helpers/messages'

export const WHITELIST_API_PREFIX = '/api/whitelist'

const router = express.Router()

router.get('/', async (req, res) => {
  const whitelist = await Whitelist.find()
  return res.json(whitelist)
})

router.get('/:id', async (req, res) => {
  const whitelistEntry = await Whitelist.findById(req.params.id)
  return res.json(whitelistEntry)
})

router.post('/', async (req, res) => {
  const whitelist = new Whitelist(req.body)

  // FIXME: is this what we want here??
  const timeToAddAsNumber = +req.body.time_added
  const currentAccessExpiryDateAsNumber = +whitelist.access_expiry_date
  whitelist.access_expiry_date = moment(currentAccessExpiryDateAsNumber + timeToAddAsNumber).toDate()

  try {
    await Whitelist.init()
    await Whitelist.create(whitelist)
    return res.json({ message: 'Whitelist entry saved.'})
  } catch (error) {
    return res.status(500).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_SAVED,
      reason: error,
    })
  }
})

router.put('/:id', async (req, res) => {
  await Whitelist.findByIdAndUpdate(req.params.id, req.body)
  return res.json({ message: APIMessage.WHITELIST.ENTRY_UPDATED })
})

router.delete('/:id', async (req, res) => {
  await Whitelist.findByIdAndRemove(req.params.id, req.body)
  return res.json({ message: APIMessage.WHITELIST.ENTRY_REMOVED })
})

export default router