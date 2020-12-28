import { ApiConvertorResponse } from './interfaces/ApiConvertorResponse'
import HttpClient from './HttpClient'

const API_ENDPOINT = 'http://tools.glowingmines.eu/convertor/nick'
const REQUEST_HEADERS = {
  'User-Agent': 'server-whitelist-manager',
  'Accept': '*/*',
  'Accept-Encoding': 'identity',
  'Connection': 'Keep-Alive',
}

// FIXME: revisit this class
export default class UUIDHandler {
  static async getOfflineUUID(user: string): Promise<string> {
    const httpClient = new HttpClient()
    const { offlinesplitteduuid } = await httpClient.get<ApiConvertorResponse>({
      url: `${API_ENDPOINT}/${user}`,
      headers: REQUEST_HEADERS,
    })

    return offlinesplitteduuid
  }
}
