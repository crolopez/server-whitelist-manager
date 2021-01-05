import { UserDoc } from 'src/types/UserDoc'
import { WhitelistNode } from 'src/types/WhitelistNode'

export interface LocalWhitelist {
  getWhitelist(format: any): Promise<UserDoc[]|WhitelistNode[]>
  getWhitelistEntry(id: string, format: any): Promise<UserDoc|WhitelistNode|null>
  getExpiredGameTags(): Promise<string[]>
  backupWhiteList(): Promise<void>
}
