import { CronJob } from 'cron'
import WhitelistHandler  from './WhitelistHandler'

function scheduleAccessLossCheck(): void {
  var job = new CronJob(`*/${process.env.EXPIRATION_CHECK_PERIOD} * * * *`, function() {
    WhitelistHandler.removeAccessToExpiredUsers()
  }, null, true, 'America/Los_Angeles');
  job.start()
}

function initCronJob (): void {
  scheduleAccessLossCheck();
}

export { initCronJob }
