import { UserDoc } from 'src/types/UserDoc'
import { RemoteWhitelistEntry } from 'src/types/RemoteWhitelistEntry'

export interface LocalWhitelist {
  getWhitelist(format?: any): Promise<UserDoc[]|RemoteWhitelistEntry[]>
  getWhitelistEntry(id: string, format?: any): Promise<UserDoc|RemoteWhitelistEntry|null>
  getExpiredGameTags(): Promise<string[]>
}
