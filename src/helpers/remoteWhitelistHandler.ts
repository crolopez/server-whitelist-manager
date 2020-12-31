import { IRemoteWhitelistHandler } from './interfaces/IRemoteWhitelistHandler'

class RemoteWhitelistHandler implements IRemoteWhitelistHandler {
  removeGameTags(tagList: string[]): Promise<any> {
    throw new Error("Method not implemented.")
  }
}

const remoteWhitelistHandler = new RemoteWhitelistHandler()
export { remoteWhitelistHandler }
