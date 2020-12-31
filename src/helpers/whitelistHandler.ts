import { IWhitelistHandler } from './interfaces/IWhitelistHandler'
import { localWhitelistHandler } from './localWhitelistHandler'
import { remoteWhitelistHandler } from './remoteWhitelistHandler'

class WhitelistHandler implements IWhitelistHandler {
  async removeAccessToExpiredUsers(): Promise<void> {
    const expiredGameTags: string[] = await localWhitelistHandler.getExpiredGameTags()
    console.log('Expired game tags: %s', expiredGameTags)
    remoteWhitelistHandler.removeGameTags(expiredGameTags)
  }
}

const whitelistHandler = new WhitelistHandler()
export { whitelistHandler }
