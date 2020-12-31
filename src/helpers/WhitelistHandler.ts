import { IWhitelistHandler } from './interfaces/IWhitelistHandler'
import LocalWhitelistHandler from './LocalWhitelistHandler'
import RemoteWhitelistHandler from './RemoteWhitelistHandler'

export class WhitelistHandler implements IWhitelistHandler {
  removeAccessToExpiredUsers(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      LocalWhitelistHandler.getExpiredGameTags()
        .then(expiredGameTags => {
          console.log('Expired game tags: %s', expiredGameTags)
          RemoteWhitelistHandler.removeGameTags(expiredGameTags)
        })
        .catch(error => {
          // TODO
        })
    })
  }
}

export default new WhitelistHandler()
