import { UserDoc } from '../types/UserDoc'
import { RemoteWhitelistEntry } from '../types/RemoteWhitelistEntry'

const EntryFormat = {
  SERVER: 'server',
  DATABASE: 'database',
} as const

export default class WhitelistFormatHandler {
  static checkFormat(format: any): void{
    if (format !== undefined && format !== EntryFormat.DATABASE && format !== EntryFormat.SERVER) {
      throw `Invalid use of 'format' parameter: ${format}.`
    }
  }

  static applyEntryFormat(whitelistEntry: UserDoc, format: any): RemoteWhitelistEntry|UserDoc {
    if (format === EntryFormat.SERVER) {
      return {
        uuid: whitelistEntry['uuid'] as unknown as string,
        name: whitelistEntry['game_tag'] as unknown as string,
      } as RemoteWhitelistEntry
    }

    return whitelistEntry
  }

  static applyEntryFormatToArray(whitelistEntries: UserDoc[], format: any): RemoteWhitelistEntry[]|UserDoc[] {
    if (format === EntryFormat.SERVER) {
      return whitelistEntries.map(function(whitelistEntry) {
        return WhitelistFormatHandler.applyEntryFormat(whitelistEntry, format) as RemoteWhitelistEntry
      })
    }

    return whitelistEntries
  }
}
