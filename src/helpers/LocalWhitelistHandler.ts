import { ILocalWhitelistHandler } from './interfaces/ILocalWhitelistHandler'

export class LocalWhitelistHandler implements ILocalWhitelistHandler {
  getExpiredGameTags(): string[] {
    throw new Error("Method not implemented.")
  }
}
