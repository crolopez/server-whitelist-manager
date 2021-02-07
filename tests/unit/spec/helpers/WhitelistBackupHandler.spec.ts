import fs from 'fs'
import { SAMPLE_WHITELIST_DB_FORMAT } from '../../data/WhitelistEntries.template'
import { TEST_DATA } from '../../data/TestData.template'
import WhitelistBackupHandler from '../../../../src/helpers/WhitelistBackupHandler'
import { localWhitelistHandler } from '../../../../src/helpers/localWhitelistHandler'

// Fake environment variables
process.env.BACKUP_FOLDER = TEST_DATA.SAMPLE_BACKUP_FOLDER

// localWhitelistHandler mocking
jest.mock('../../../../src/helpers/localWhitelistHandler', () => {
  return {
    localWhitelistHandler: {
      getWhitelist: jest.fn().mockReturnValue(SAMPLE_WHITELIST_DB_FORMAT),
    },
  }
})

// fs mocking
jest.mock('fs', () => {
  return {
    existsSync: jest.fn(),
    mkdirSync: jest.fn(),
    readFileSync: jest.fn(),
    readdirSync: jest.fn(),
    writeFile: jest.fn(),
  }
})

// moment mocking
jest.mock('moment', () => {
  return (): any => {
    return jest.requireActual('moment')(TEST_DATA.SAMPLE_CURRENT_DATE).utc()
  }
})

describe('Class WhitelistBackupHandler', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('#backupWhiteList - The backup folder is created if it does not exist', async () => {
    fs.existsSync = jest.fn().mockReturnValue(false)

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.mkdirSync).toBeCalledTimes(1)
    expect(fs.mkdirSync).toBeCalledWith(TEST_DATA.SAMPLE_BACKUP_FOLDER)
  })

  test('#backupWhiteList - The backup folder is not created if it exists', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true)

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.mkdirSync).toBeCalledTimes(0)
  })

  test('#backupWhiteList - getWhitelist method is called', async () => {
    await WhitelistBackupHandler.backupWhiteList()

    expect(localWhitelistHandler.getWhitelist).toBeCalledTimes(1)
  })

  test('#backupWhiteList - The backup folder is scanned', async () => {
    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.readdirSync).toBeCalledTimes(1)
    expect(fs.readdirSync).toBeCalledWith(TEST_DATA.SAMPLE_BACKUP_FOLDER)
  })

  test('#backupWhiteList - Dont try to get any backup if the folder is empty', async () => {
    fs.readdirSync = jest.fn().mockReturnValue([])

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.readFileSync).toBeCalledTimes(0)
  })

  test('#backupWhiteList - Get the stored backup if it exists', async () => {
    fs.readdirSync = jest.fn().mockReturnValue([TEST_DATA.SAMPLE_STORED_BACKUP]),

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.readFileSync).toBeCalledTimes(1)
    expect(fs.readFileSync).toBeCalledWith(`${TEST_DATA.SAMPLE_BACKUP_FOLDER}/${TEST_DATA.SAMPLE_STORED_BACKUP}`, 'utf8')
  })

  test('#backupWhiteList - Dont create a new backup if it is identical to the last one', async () => {
    fs.readdirSync = jest.fn().mockReturnValue([TEST_DATA.SAMPLE_STORED_BACKUP]),
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(SAMPLE_WHITELIST_DB_FORMAT))

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.writeFile).toBeCalledTimes(0)
  })

  test('#backupWhiteList - Create a new backup if the whitelist has been modified', async () => {
    fs.readdirSync = jest.fn().mockReturnValue([TEST_DATA.SAMPLE_STORED_BACKUP]),
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify([]))

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.writeFile).toBeCalledTimes(1)
    expect(fs.writeFile).toBeCalledWith(TEST_DATA.SAMPLE_BACKUP_PATH, JSON.stringify(SAMPLE_WHITELIST_DB_FORMAT), expect.any(Function))
  })

  test('#backupWhiteList - A failure when trying to write a backup is handled', async () => {
    fs.readdirSync = jest.fn().mockReturnValue([TEST_DATA.SAMPLE_STORED_BACKUP]),
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify([]))
    fs.writeFile = jest.fn()

    await WhitelistBackupHandler.backupWhiteList()

    expect(fs.writeFile).toBeCalledTimes(1)
    expect(fs.writeFile).toBeCalledWith(TEST_DATA.SAMPLE_BACKUP_PATH, JSON.stringify(SAMPLE_WHITELIST_DB_FORMAT), expect.any(Function))
  })
})
