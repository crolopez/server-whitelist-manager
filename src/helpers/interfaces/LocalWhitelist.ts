import { UserDoc } from 'src/types/UserDoc'
import { RemoteWhitelistEntry } from 'src/types/RemoteWhitelistEntry'

export interface LocalWhitelist {
  getWhitelist(format?: any): Promise<UserDoc[]|RemoteWhitelistEntry[]>
  getWhitelistEntry(id: string, format?: any): Promise<UserDoc|RemoteWhitelistEntry|null>
  getExpiredGameTags(): Promise<string[]>
  createWhitelistEntry(body: any): Promise<void>
  updateWhitelistEntry(id: string, body: any): Promise<void>
  removeWhitelistEntry(id: string, body: any): Promise<void>
}
