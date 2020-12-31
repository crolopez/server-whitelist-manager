import moment from 'moment'

export default class TimeAccessHandler {
  static increaseTime(date: moment.Moment, addedTime: string): Date {
    const increment = parseInt(addedTime, 10)

    if (addedTime.includes('s')) {
      date.add(increment, 'seconds')
    } else if (addedTime.includes('m')) {
      date.add(increment, 'minutes')
    } else if (addedTime.includes('h')) {
      date.add(increment, 'hours')
    } else if (addedTime.includes('d')) {
      date.add(increment, 'days')
    } else if (addedTime.includes('w')) {
      date.add(increment, 'weeks')
    } else if (addedTime.includes('M')) {
      date.add(increment, 'months')
    } else {
      date.add(increment, 'seconds')
    }

    return date.toDate()
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
