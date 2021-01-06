import { LocalWhitelist } from './interfaces/LocalWhitelist'
import Whitelist from '../models/Whitelist'
import { UserDoc } from '../types/UserDoc'
import { RemoteWhitelistEntry } from '../types/RemoteWhitelistEntry'
import WhitelistFormatHandler from './WhitelistFormatHandler'
import WhitelistExpirationHandler from './WhitelistExpirationHandler'
import TimeAccessHandler from '../helpers/TimeAccessHandler'
import UUIDHandler from '../helpers/UUIDHandler'

class LocalWhitelistHandler implements LocalWhitelist {
  public async getWhitelist(params?: any): Promise<UserDoc[]|RemoteWhitelistEntry[]> {
    WhitelistFormatHandler.checkFormat(params?.format)
    WhitelistExpirationHandler.checkShowExpired(params?.showexpired)

    const findQuery = WhitelistExpirationHandler.getFindQuery(params?.showexpired)
    const whitelistEntries: UserDoc[] = await Whitelist.find(findQuery)
    return WhitelistFormatHandler.applyEntryFormatToArray(whitelistEntries, params?.format)
  }

  public async getWhitelistEntry(id: string, params?: any): Promise<UserDoc|RemoteWhitelistEntry|null> {
    WhitelistFormatHandler.checkFormat(params?.format)

    const whitelistEntry = await Whitelist.findById(id)
    return whitelistEntry ? WhitelistFormatHandler.applyEntryFormat(whitelistEntry, params?.format) : null
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

  private updateExpiryDate(whitelistEntry: UserDoc, newParams: any): void {
    if (newParams?.access_time &&
      // We have the date on DB. Should we use the one the client sends?
      newParams?.access_expiry_date) {
      // Is this server-side work?
      whitelistEntry.access_expiry_date = TimeAccessHandler.
        getUpdatedExpiryDate(whitelistEntry.access_expiry_date, newParams.access_time)
    }
  }

  private async updateUUID(whitelistEntry: UserDoc, newParams: any): Promise<void> {
    if (newParams?.game_tag) {
      whitelistEntry.uuid = await UUIDHandler.getOfflineUUID(newParams.game_tag)
    }
  }
}

const localWhitelistHandler = new LocalWhitelistHandler()
export { localWhitelistHandler }
