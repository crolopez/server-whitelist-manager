import { UserDoc } from '../types/UserDoc'
import { WhitelistNode } from '../types/WhitelistNode'

const EntryFormat = {
  SERVER: 'server',
  DATABASE: 'database',
} as const

export default class WhitelistFormatHandler {
  static checkFormat(format: any): void{
    if (format !== undefined && format !== EntryFormat.DATABASE && format !== EntryFormat.SERVER) {
      throw `Invalid request format: ${format}.`
    }
  }

  static applyEntryFormat(whitelistEntry: UserDoc, format: any): WhitelistNode|UserDoc {
    if (format === EntryFormat.SERVER) {
      return {
        uuid: whitelistEntry['uuid'] as unknown as string,
        name: whitelistEntry['game_tag'] as unknown as string,
      } as WhitelistNode
    }

    return whitelistEntry
  }

  static applyEntryFormatToArray(whitelistEntries: UserDoc[], format: any): WhitelistNode[]|UserDoc[] {
    if (format === EntryFormat.SERVER) {
      return whitelistEntries.map(function(whitelistEntry) {
        return WhitelistFormatHandler.applyEntryFormat(whitelistEntry, format) as WhitelistNode
      })
    }

    return whitelistEntries
  }
}
