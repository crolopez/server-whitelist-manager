import { IWhitelistHandler } from './interfaces/IWhitelistHandler'

export class WhitelistHandler implements IWhitelistHandler {
  removeAccessToExpiredUsers(): Promise<any> {
    throw new Error("Method not implemented.")
  }
}

export default new WhitelistHandler()
