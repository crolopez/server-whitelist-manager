import { LocalWhitelist } from './interfaces/LocalWhitelist'
import Whitelist from '../models/Whitelist'
import { UserDoc } from '../types/UserDoc'
import { RemoteWhitelistEntry } from '../types/RemoteWhitelistEntry'
import WhitelistFormatHandler from './WhitelistFormatHandler'
import moment from 'moment'

class LocalWhitelistHandler implements LocalWhitelist {
  public async getWhitelist(format?: any): Promise<UserDoc[]|RemoteWhitelistEntry[]> {
    WhitelistFormatHandler.checkFormat(format)

    const whitelistEntries: UserDoc[] = await Whitelist.find()
    return WhitelistFormatHandler.applyEntryFormatToArray(whitelistEntries, format)
  }

  public async getWhitelistEntry(id: string, format?: any): Promise<UserDoc|RemoteWhitelistEntry|null> {
    WhitelistFormatHandler.checkFormat(format)

    const whitelistEntry = await Whitelist.findById(id)
    return whitelistEntry ? WhitelistFormatHandler.applyEntryFormat(whitelistEntry, format) : null
  }

  public async getExpiredGameTags(): Promise<string[]|any>  {
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
