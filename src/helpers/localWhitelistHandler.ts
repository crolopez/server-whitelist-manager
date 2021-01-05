import { LocalWhitelist } from './interfaces/LocalWhitelist'
import Whitelist from '../models/Whitelist'
import { UserDoc } from '../types/UserDoc'
import { RemoteWhitelistEntry } from '../types/RemoteWhitelistEntry'
import WhitelistFormatHandler from './WhitelistFormatHandler'
import TimeAccessHandler from '../helpers/TimeAccessHandler'
import UUIDHandler from '../helpers/UUIDHandler'
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

  public async createWhitelistEntry(body: any): Promise<void> {
    const whitelistEntry = new Whitelist(body)
    whitelistEntry.access_expiry_date = TimeAccessHandler.getNewExpiryDate(body.access_time)
    whitelistEntry.uuid = await UUIDHandler.getOfflineUUID(body.game_tag)

    await Whitelist.init()
    await Whitelist.create(whitelistEntry)
  }

  public async updateWhitelistEntry(id: string, body: any): Promise<void>   {
    const whitelistEntry = new Whitelist(body)

    this.updateExpiryDate(whitelistEntry, body)
    await this.updateUUID(whitelistEntry, body)

    await Whitelist.findByIdAndUpdate(id, whitelistEntry )
  }

  public async removeWhitelistEntry(id: string, body: any): Promise<void>   {
    await Whitelist.findByIdAndRemove(id, body)
  }

  private updateExpiryDate(whitelistEntry: UserDoc, requestParams: any): void {
    if (requestParams?.access_time &&
      // We have the date on DB. Should we use the one the client sends?
      requestParams?.access_expiry_date) {
      // Is this server-side work?
      whitelistEntry.access_expiry_date = TimeAccessHandler.
        getUpdatedExpiryDate(whitelistEntry.access_expiry_date, requestParams.access_time)
    }
  }

  private async updateUUID(whitelistEntry: UserDoc, requestParams: any): Promise<void> {
    if (requestParams?.game_tag) {
      whitelistEntry.uuid = await UUIDHandler.getOfflineUUID(requestParams.game_tag)
    }
  }
}

const localWhitelistHandler = new LocalWhitelistHandler()
export { localWhitelistHandler }
