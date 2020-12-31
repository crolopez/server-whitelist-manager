export interface ILocalWhitelistHandler {
  getExpiredGameTags(): Promise<string[]>
}
