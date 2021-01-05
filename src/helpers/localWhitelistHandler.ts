import { LocalWhitelist } from './interfaces/LocalWhitelist'
import Whitelist from '../models/Whitelist'
import moment from 'moment'
import fs from 'fs'

class LocalWhitelistHandler implements LocalWhitelist {
  async getExpiredGameTags(): Promise<string[]|any>  {
    Whitelist.find({ access_expiry_date: { $lt: moment().toDate() } }).exec()
      .then(whitelistEntries => {
        const gameTags: string[] = whitelistEntries.map(function(whitelistEntry) {
          return whitelistEntry['game_tag'] as unknown as string
        })
        return gameTags
      })
  }

  async backupWhiteList(): Promise<void>  {
    await this.checkBackupFolder()
    console.log('Generating whitelist backup.')

    const newBackup: string = await this.exportBackup()

    try {
      const lastBackupFileName: string = this.getLastBackupFileName()
      const lastBackup: string = this.getBackup(lastBackupFileName)

      if (lastBackup === newBackup) {
        console.log('The whitelist has not changed.')
        return
      }
    } catch (error) {
      console.log(error)
    }

    const backupPath = `${process.env.BACKUP_FOLDER}/${moment().format('YYYY-MM-DD-HH-mm-ss')}-whitelist-backup`
    fs.writeFile(backupPath, newBackup, (err) => {
      if (err) {
        return console.log(err)
      }
    })
  }

  async checkBackupFolder(): Promise<void> {
    if (!fs.existsSync(`${process.env.BACKUP_FOLDER}`)){
      console.log(`Creating backup folder: ${process.env.BACKUP_FOLDER}.`)
      fs.mkdirSync(`${process.env.BACKUP_FOLDER}`)
    }
  }

  async exportBackup(): Promise<string> {
    const whitelistEntries = await Whitelist.find()
    return JSON.stringify(whitelistEntries)
  }

  getLastBackupFileName(): string {
    const files: string[] = fs.readdirSync(`${process.env.BACKUP_FOLDER}`)
    if (files.length == 0) {
      throw 'There is no files in the backup folder.'
    }

    return files[files.length - 1]
  }

  getBackup(backupName: string): string {
    const backupPath = `${process.env.BACKUP_FOLDER}/${backupName}`
    const data: string = fs.readFileSync(backupPath, 'utf8')
    return data
  }
}

const localWhitelistHandler = new LocalWhitelistHandler()
export { localWhitelistHandler }
