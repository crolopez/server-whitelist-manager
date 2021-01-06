import express from 'express'
import { APIMessage, ServerMessage } from '../helpers/messages'
import { localWhitelistHandler } from '../helpers/localWhitelistHandler'

export const WHITELIST_API_PREFIX = '/api/whitelist'

const router = express.Router()

router.get('/', async (req, res): Promise<any> => {
  try {
    const whitelistEntries = await localWhitelistHandler.getWhitelist(req.query)
    return res.json(whitelistEntries)
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_FOUND,
      reason: error,
    })
  }
})

router.get('/:id', async (req, res): Promise<any> => {
  try {
    const whitelistEntry = await localWhitelistHandler.getWhitelistEntry(req.params.id, req.query)
    return res.json(whitelistEntry)
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_FOUND,
      reason: error,
    })
  }
})

router.post('/', async (req, res): Promise<any> => {
  try {
    await localWhitelistHandler.createWhitelistEntry(req.body)
    return res.json({ message:  APIMessage.WHITELIST_SUCCESS.ENTRY_SAVED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_SAVED,
      reason: error,
    })
  }
})

router.put('/:id', async (req, res): Promise<any> => {
  try {
    await localWhitelistHandler.updateWhitelistEntry(req.params.id, req.body)
    return res.json({ message:  APIMessage.WHITELIST_SUCCESS.ENTRY_UPDATED})
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_UPDATED,
      reason: error,
    })
  }
})

router.delete('/:id', async (req, res): Promise<any> => {
  try {
    await localWhitelistHandler.removeWhitelistEntry(req.params.id, req.body)
    return res.json({ message: APIMessage.WHITELIST_SUCCESS.ENTRY_REMOVED })
  } catch (error) {
    return res.status(ServerMessage.ERROR.INTERNAL_SERVER_ERROR).json({
      message: APIMessage.WHITELIST_ERROR.ENTRY_NOT_REMOVED,
      reason: error,
    })
  }
})

export default router
