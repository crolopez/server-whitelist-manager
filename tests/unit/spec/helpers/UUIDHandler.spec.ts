import nock from 'nock'
import UUIDHandler from '../../../../src/helpers/UUIDHandler'

describe('Class UUIDHandler', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

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
