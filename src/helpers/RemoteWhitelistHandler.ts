import { IRemoteWhitelistHandler } from './interfaces/IRemoteWhitelistHandler'

export class RemoteWhitelistHandler implements IRemoteWhitelistHandler {
  removeGameTags(tagList: string[]): Promise<any> {
    throw new Error("Method not implemented.")
  }
}
