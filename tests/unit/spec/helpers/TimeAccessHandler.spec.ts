import moment from 'moment'
import TimeAccessHandler from '../../../../src/helpers/TimeAccessHandler'

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
