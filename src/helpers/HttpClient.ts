import axios, { AxiosRequestConfig/*, AxiosError, AxiosResponse */ } from 'axios'
import { IHttpClient } from './interfaces/IHttpClient'
import { IHttpClientRequestParameters } from './interfaces/IHttpClientRequestParameters'

export class HttpClient implements IHttpClient {
  get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, token } = parameters

      const options: AxiosRequestConfig = {
        headers: {}
      }

      if (token !== undefined) {
        options.headers.RequestVerificationToken = token
      }

      axios
        .get(url, options)
        .then((response: any) => {
          resolve(response.data as T)
        })
        .catch((response: any) => {
          reject(response)
        })
    })
  }

  post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const { url, payload, token } = parameters

      const options: AxiosRequestConfig = {
        headers: {}
      }

      if (token !== '') {
        options.headers.RequestVerificationToken = token
      }

      axios
        .post(url, payload, options)
        .then((response: any) => {
          resolve(response.data as T)
        })
        .catch((response: any) => {
          reject(response)
        })
    })
  }
}
