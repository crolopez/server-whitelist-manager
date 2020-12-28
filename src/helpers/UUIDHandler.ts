// import axios, { AxiosRequestConfig } from 'axios'
import { HttpClient } from './HttpClient'
import { IHttpClientRequestParameters } from './interfaces/IHttpClientRequestParameters'

const APIUrl = 'http://tools.glowingmines.eu/convertor/nick/'
const requestHeaders = {
  'User-Agent': 'server-whitelist-manager',
  'Accept': '*/*',
  'Accept-Encoding': 'identity',
  'Connection': 'Keep-Alive'
}

// TO IMPROVE
class UUIDHandler {
  static getOfflineUUID(user: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const getParameters: IHttpClientRequestParameters<string> = {
        url: APIUrl + user,
        headers: requestHeaders
      }

      console.log('UUIDHandler0');

      const httpClient = new HttpClient();
      httpClient.get<string>(getParameters)
        .then((response: any) => {
          resolve(response['offlinesplitteduuid'] as string)
        })
        .catch((response: any) => {
          reject(response)
        })
    })
  }
}

export { UUIDHandler }
