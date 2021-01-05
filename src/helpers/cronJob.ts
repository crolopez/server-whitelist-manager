import { CronJob } from 'cron'
import { localWhitelistHandler } from './localWhitelistHandler'

function whitelistBackupScheduler(): void {
  const job = new CronJob(`*/${process.env.BACKUP_PERIOD} * * * *`, function() {
    localWhitelistHandler.backupWhiteList()
  }, null, true, 'America/Los_Angeles')
  job.start()
}

function initCronJob (): void {
  whitelistBackupScheduler()
}

export { initCronJob }
