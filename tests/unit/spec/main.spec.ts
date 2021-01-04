import nock from 'nock'
import moment from 'moment'
import UUIDHandler from '../../../src/helpers/UUIDHandler'
import HttpClient from '../../../src/helpers/HttpClient'
import TimeAccessHandler from '../../../src/helpers/TimeAccessHandler'

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
    beforeEach(() => {
      nock.disableNetConnect()
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
      const result = await HttpClient.get<string>({
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
      const result = await HttpClient.put<string>({
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

  describe('Class TimeAccessHandler', () => {
    let BaseDate: moment.Moment
    beforeEach(() => {
      BaseDate = moment('2021-01-01T00:00:00.000Z')
      Date.now = jest.fn(() => BaseDate.valueOf())

    })

    test('#increaseTime (with seconds)', async () => {
      const Increment = '1s'
      const ExpectedDate = new Date('2021-01-01T00:00:01.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (with minutes)', async () => {
      const Increment = '1m'
      const ExpectedDate = new Date('2021-01-01T00:01:00.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (with hours)', async () => {
      const Increment = '1h'
      const ExpectedDate = new Date('2021-01-01T01:00:00.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (with days)', async () => {
      const Increment = '1d'
      const ExpectedDate = new Date('2021-01-02T00:00:00.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (with weeks)', async () => {
      const Increment = '1w'
      const ExpectedDate = new Date('2021-01-08T00:00:00.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (with months)', async () => {
      const Increment = '1M'
      const ExpectedDate = new Date('2021-02-01T00:00:00.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#increaseTime (without suffix)', async () => {
      const Increment = '1'
      const ExpectedDate = new Date('2021-01-01T00:00:01.000Z')

      const result = await TimeAccessHandler.increaseTime(BaseDate, Increment)

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#getNewExpiryDate', async () => {
      const ExpectedDate = new Date('2021-02-01T00:00:00.000Z')

      const result = await TimeAccessHandler.getNewExpiryDate('1M')

      expect(result).toStrictEqual(ExpectedDate)
    })

    test('#getUpdatedExpiryDate', async () => {
      const ExpectedDate = new Date('2021-01-11T00:00:00.000Z')

      const result = await TimeAccessHandler.getUpdatedExpiryDate(BaseDate.toDate(), '10d')

      expect(result).toStrictEqual(ExpectedDate)
    })
  })
})
