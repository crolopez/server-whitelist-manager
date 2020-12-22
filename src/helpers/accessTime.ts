const moment = require('moment');

class TimeAccessHandler {
  static increaseTime(moment: any, addedTime: string) : Date {
    let increment = parseInt(addedTime, 10)

    if (addedTime.includes('s')) {
      moment.add(increment, 'seconds');
    } else if (addedTime.includes('m')) {
      moment.add(increment, 'minutes');
    } else if (addedTime.includes('h')) {
      moment.add(increment, 'hours');
    } else if (addedTime.includes('d')) {
      moment.add(increment, 'days');
    } else if (addedTime.includes('w')) {
      moment.add(increment, 'weeks');
    } else if (addedTime.includes('M')) {
      moment.add(increment, 'months');
    } else {
      moment.add(increment, 'seconds');
    }

    return moment.toDate();
  }

  static getNewExpiryDate(accesTime: string) : Date {
    let currentDate = moment();
    return this.increaseTime(currentDate, accesTime);
  }

  static getUpdatedExpiryDate(savedDate: Date, addedTime: string) : Date {
    let dateToExtend = moment(savedDate);
    let currentDate = moment();

    if (dateToExtend < currentDate) {
      return this.increaseTime(currentDate, addedTime);
    }

    return this.increaseTime(currentDate, addedTime);
  }
}

export { TimeAccessHandler }
