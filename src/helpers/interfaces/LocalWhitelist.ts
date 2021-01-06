import { UserDoc } from 'src/types/UserDoc'
import { RemoteWhitelistEntry } from 'src/types/RemoteWhitelistEntry'

export interface LocalWhitelist {
  getWhitelist(params?: any): Promise<UserDoc[]|RemoteWhitelistEntry[]>
  getWhitelistEntry(id: string, params?: any): Promise<UserDoc|RemoteWhitelistEntry|null>
  createWhitelistEntry(body: any): Promise<void>
  updateWhitelistEntry(id: string, body: any): Promise<void>
  removeWhitelistEntry(id: string, body: any): Promise<void>
}
