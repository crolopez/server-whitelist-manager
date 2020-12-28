export interface IHttpClientRequestParameters<T> {
  url: string,
  token?: string,
  payload?: T,
  headers: object
}
