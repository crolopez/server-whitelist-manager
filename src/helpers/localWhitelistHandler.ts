import { ILocalWhitelistHandler } from './interfaces/ILocalWhitelistHandler'
import Whitelist from '../models/Whitelist'
import moment from 'moment'

class LocalWhitelistHandler implements ILocalWhitelistHandler {
  async getExpiredGameTags(): Promise<string[]|any>  {
    Whitelist.find({ access_expiry_date: { $lt: moment().toDate() } }).exec()
      .then(whitelistEntries => {
        const gameTags: string[] = whitelistEntries.map(function(whitelistEntry) {
          return whitelistEntry['game_tag'] as unknown as string
        })
        return gameTags
      })
  }
}

const localWhitelistHandler = new LocalWhitelistHandler()
export { localWhitelistHandler }