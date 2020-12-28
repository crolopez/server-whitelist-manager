export interface IRemoteWhitelistHandler {
  removeGameTags(tagList: string[]): Promise<any>
}
