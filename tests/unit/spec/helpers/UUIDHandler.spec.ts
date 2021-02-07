import nock from 'nock'
import UUIDHandler from '../../../../src/helpers/UUIDHandler'

describe('Class UUIDHandler', () => {
  beforeEach(() => {
    nock.disableNetConnect()
  })

  test('#getOfflineUUID', async () => {
    const username = 'crolopez'
    const expectedResponse = {
      nick: username,
      offlineuuid: 'fakeofflineuuid',
      offlinesplitteduuid: 'fakeofflinesplitteduuid',
    }

    nock('http://tools.glowingmines.eu')
      .get(`/convertor/nick/${username}`)
      .reply(200, expectedResponse)

    const result = await UUIDHandler.getOfflineUUID(username)

    expect(result).toBe(expectedResponse.offlinesplitteduuid)
  })
})
