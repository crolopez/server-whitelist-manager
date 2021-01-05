export interface LocalWhitelist {
  getExpiredGameTags(): Promise<string[]>
  backupWhiteList(): Promise<void>
}
