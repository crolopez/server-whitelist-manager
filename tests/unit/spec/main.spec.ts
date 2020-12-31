import nock from 'nock'
import { UUIDHandler } from '../../../src/helpers/UUIDHandler'
import HttpClient from '../../../src/helpers/HttpClient'

describe('Whitelist manager', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })
  describe('Class UUIDHandler', () => {
    test('#getOfflineUUID', async () => {
      // data
      const username = 'crolopez'
      const expectedResponse = {
        nick: username,
        offlineuuid: 'fakeofflineuuid',
        offlinesplitteduuid: 'fakeofflinesplitteduuid',
      }

      // mock request
      nock('http://tools.glowingmines.eu')
        .get(`/convertor/nick/${username}`)
        .reply(200, expectedResponse)

      // call the method
      const result = await UUIDHandler.getOfflineUUID(username)

      // assert the result
      expect(result).toBe(expectedResponse.offlinesplitteduuid)
    })
  })

  describe('Class HttpClient', () => {
    let httpClientInstance: HttpClient
    beforeEach(() => {
      nock.disableNetConnect()
      httpClientInstance = new HttpClient()
    })
    test('#get', async () => {
      // data
      const url = 'https://fake.com'
      const expectedResponse = 'fakeStringResponse'

      // mock request
      nock(url)
        .get('/')
        .reply(200, expectedResponse)

      // call the method
      const result = await httpClientInstance.get<string>({
        url,
        headers: {},
      })

      // assert the result
      expect(result).toBe(expectedResponse)
    })

    test('#put', async () => {
      // data
      const url = 'https://fake.com'
      const expectedResponse = 'fakeStringResponse'

      // mock request
      nock(url)
        .put('/')
        .reply(200, expectedResponse)

      // call the method
      const result = await httpClientInstance.put<string>({
        url,
        headers: {},
      })

      // assert the result
      expect(result).toBe(expectedResponse)
    })

    test('#buildHeaders (with token)', () => {
      const RequestVerificationToken = 'fooToken'
      const headersToken = { headers: {RequestVerificationToken } }

      expect(HttpClient.buildHeaders(RequestVerificationToken)).toEqual(headersToken)
    })

    test('#buildHeaders (without token)', () => {
      const headersNoToken = { headers: {} }

      expect(HttpClient.buildHeaders(undefined)).toEqual(headersNoToken)
    })
  })
})