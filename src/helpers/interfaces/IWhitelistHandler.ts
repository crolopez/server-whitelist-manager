export interface IWhitelistHandler {
  removeAccessToExpiredUsers(): Promise<any>
}
