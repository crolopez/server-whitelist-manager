import nock from 'nock'
import HttpClient from '../../../../src/helpers/HttpClient'

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
