import express from 'express'
import Whitelist from '../models/Whitelist'
import { APIMessage, ServerMessage } from '../helpers/messages'
import { TimeAccessHandler } from '../helpers/accessTime'

export const WHITELIST_API_PREFIX = '/api/whitelist'

const router = express.Router()

router.get('/', async (req, res) : Promise<any> => {
  const whitelistEntry = await Whitelist.find()
  return res.json(whitelistEntry)
})

router.get('/:id', async (req, res) : Promise<any> => {
  const whitelistEntry = await Whitelist.findById(req.params.id)
  return res.json(whitelistEntry)
})

router.post('/', async (req, res) : Promise<any> => {
  const whitelistEntry = new Whitelist(req.body)
  whitelistEntry.access_expiry_date = TimeAccessHandler.getNewExpiryDate(req.body.access_time)

  try {
    await Whitelist.init()
    await Whitelist.create(whitelistEntry)
    return res.json({ message:  APIMessage.WHITELIST.ENTRY_SAVED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_SAVED,
      reason: error,
    })
  }
})

router.put('/:id', async (req, res) : Promise<any> => {
  let whitelistEntry = new Whitelist(req.body)
  if (req.body.access_time !== undefined) {
    whitelistEntry.access_expiry_date = TimeAccessHandler.
    getUpdatedExpiryDate(whitelistEntry.access_expiry_date, req.body.access_time)
  }

  try {
    await Whitelist.findByIdAndUpdate(req.params.id, whitelistEntry )
    return res.json({ message:  APIMessage.WHITELIST.ENTRY_UPDATED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_UPDATED,
      reason: error,
    })
  }
})

router.delete('/:id', async (req, res) : Promise<any> => {
  await Whitelist.findByIdAndRemove(req.params.id, req.body)
  return res.json({ message: APIMessage.WHITELIST.ENTRY_REMOVED })
})

export default router
