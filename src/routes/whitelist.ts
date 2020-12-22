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
  try {
    const whitelistEntry = await Whitelist.findById(req.params.id)
    res.json(whitelistEntry)
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_FOUND,
      reason: error,
    })
  }
})

router.post('/', async (req, res) : Promise<any> => {
  const whitelistEntry = new Whitelist(req.body)
  whitelistEntry.access_expiry_date = TimeAccessHandler.getNewExpiryDate(req.body.access_time)

  try {
    await Whitelist.init()
    await Whitelist.create(whitelistEntry)
    return res.json({ message:  APIMessage.WHITELIST_SUCCESS.ENTRY_SAVED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_SAVED,
      reason: error,
    })
  }
})

router.put('/:id', async (req, res) : Promise<any> => {
  let whitelistEntry = new Whitelist(req.body)
  if (req.body.access_time !== undefined
      // We have the date on DB. Should we use the one the customer sends?
      && req.body.access_expiry_date !== undefined) {
    // Is this server-side work?
    whitelistEntry.access_expiry_date = TimeAccessHandler.
      getUpdatedExpiryDate(whitelistEntry.access_expiry_date, req.body.access_time)
  }

  try {
    await Whitelist.findByIdAndUpdate(req.params.id, whitelistEntry )
    return res.json({ message:  APIMessage.WHITELIST_SUCCESS.ENTRY_UPDATED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_UPDATED,
      reason: error,
    })
  }
})

router.delete('/:id', async (req, res) : Promise<any> => {
  try {
    await Whitelist.findByIdAndRemove(req.params.id, req.body)
    return res.json({ message: APIMessage.WHITELIST_SUCCESS.ENTRY_REMOVED })
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_REMOVED,
      reason: error,
    })
  }
})

export default router
