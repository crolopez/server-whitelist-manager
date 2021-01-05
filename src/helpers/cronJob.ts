import { CronJob } from 'cron'
import WhitelistBackupHandler from './WhitelistBackupHandler'

function whitelistBackupScheduler(): void {
  const job = new CronJob(`*/${process.env.BACKUP_PERIOD} * * * *`, function() {
    WhitelistBackupHandler.backupWhiteList()
  }, null, true, 'America/Los_Angeles')
  job.start()
}

function initCronJob (): void {
  whitelistBackupScheduler()
}

export { initCronJob }
