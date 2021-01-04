export interface LocalWhitelist {
  getExpiredGameTags(): Promise<string[]>
}
