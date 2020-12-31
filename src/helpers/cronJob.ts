import { CronJob } from 'cron'
import { whitelistHandler } from './whitelistHandler'

function scheduleAccessLossCheck(): void {
  var job = new CronJob(`*/${process.env.EXPIRATION_CHECK_PERIOD} * * * *`, function() {
    whitelistHandler.removeAccessToExpiredUsers()
  }, null, true, 'America/Los_Angeles');
  job.start()
}

function initCronJob (): void {
  scheduleAccessLossCheck();
}

export { initCronJob }
