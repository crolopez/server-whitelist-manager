import fs from 'fs'
import moment from 'moment'
import { localWhitelistHandler } from './localWhitelistHandler'

function log(msg: string): void {
  console.log(`[Backup module] ${msg}`)
}

async function checkBackupFolder(): Promise<void> {
  if (!fs.existsSync(`${process.env.BACKUP_FOLDER}`)){
    log(`Creating backup folder: ${process.env.BACKUP_FOLDER}.`)
    fs.mkdirSync(`${process.env.BACKUP_FOLDER}`)
  }
}

async function exportBackup(): Promise<string> {
  const whitelistEntries = await localWhitelistHandler.getWhitelist()
  return JSON.stringify(whitelistEntries)
}

function getLastBackupFileName(): string {
  const files: string[] = fs.readdirSync(`${process.env.BACKUP_FOLDER}`)
  if (files.length == 0) {
    throw 'There is no files in the backup folder.'
  }

  return files[files.length - 1]
}

function getBackup(backupName: string): string {
  const backupPath = `${process.env.BACKUP_FOLDER}/${backupName}`
  const data: string = fs.readFileSync(backupPath, 'utf8')
  return data
}

export default class WhitelistBackupHandler {
  static async backupWhiteList(): Promise<void>  {
    await checkBackupFolder()
    log('Generating whitelist backup.')

    const newBackup: string = await exportBackup()

    try {
      const lastBackupFileName: string = getLastBackupFileName()
      const lastBackup: string = getBackup(lastBackupFileName)

      if (lastBackup === newBackup) {
        log('The whitelist has not changed.')
        return
      }
    } catch (error) {
      log(error)
    }

    const backupPath = `${process.env.BACKUP_FOLDER}/${moment().format('YYYY-MM-DD-HH-mm-ss')}-whitelist-backup`
    fs.writeFile(backupPath, newBackup, (err) => {
      if (err) {
        return log(`${err}`)
      }
    })
  }
}
