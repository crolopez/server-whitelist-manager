import { ILocalWhitelistHandler } from './interfaces/ILocalWhitelistHandler'
import Whitelist from '../models/Whitelist'
import moment from 'moment'

class LocalWhitelistHandler implements ILocalWhitelistHandler {
  getExpiredGameTags(): Promise<string[]>  {
    return new Promise<string[]>((resolve, reject) => {
      Whitelist.find({ access_expiry_date: { $lt: moment().toDate() } }).exec()
        .then(whitelistEntries => {
          let gameTags: string[] = whitelistEntries.map(function(whitelistEntry) {
            return whitelistEntry['game_tag'] as unknown as string;
          });
          resolve(gameTags)
        })
        .catch(error => {
          // TODO
        })
    })
  }
}

export default new LocalWhitelistHandler()
