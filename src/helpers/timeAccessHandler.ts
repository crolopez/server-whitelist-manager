import moment from 'moment'

export default class TimeAccessHandler {
  static increaseTime(moment: moment.Moment, addedTime: string): Date {
    const increment = parseInt(addedTime, 10)

    if (addedTime.includes('s')) {
      moment.add(increment, 'seconds')
    } else if (addedTime.includes('m')) {
      moment.add(increment, 'minutes')
    } else if (addedTime.includes('h')) {
      moment.add(increment, 'hours')
    } else if (addedTime.includes('d')) {
      moment.add(increment, 'days')
    } else if (addedTime.includes('w')) {
      moment.add(increment, 'weeks')
    } else if (addedTime.includes('M')) {
      moment.add(increment, 'months')
    } else {
      moment.add(increment, 'seconds')
    }

    return moment.toDate()
  }

  static getNewExpiryDate(accesTime: string): Date {
    const currentDate = moment()
    return this.increaseTime(currentDate, accesTime)
  }

  static getUpdatedExpiryDate(savedDate: Date, addedTime: string): Date {
    const dateToExtend = moment(savedDate)
    const currentDate = moment()

    if (dateToExtend < currentDate) {
      return this.increaseTime(currentDate, addedTime)
    }

    return this.increaseTime(dateToExtend, addedTime)
  }
}
