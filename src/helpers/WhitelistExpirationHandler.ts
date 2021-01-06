import moment from 'moment'

const ShowExpirationValue = {
  YES: 'yes',
  NO: 'no',
} as const

export default class WhitelistExpirationHandler {
  static checkShowExpired(showexpired: any): void{
    if (showexpired !== undefined && showexpired !== ShowExpirationValue.YES && showexpired !== ShowExpirationValue.NO) {
      throw `Invalid use of 'showexpired' parameter: ${showexpired}.`
    }
  }

  static getFindQuery(showexpired: any): object  {
    return showexpired === ShowExpirationValue.NO ?
      { access_expiry_date: { $gt: moment().toDate() } } : {}
  }
}
