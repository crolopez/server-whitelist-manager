const mongoose = require('mongoose')
const moment = require('moment');

const { Schema } = mongoose;
moment().format();

function addTimeToDate(date, time) {
    var increment = parseInt(time, 10)

    if (time.includes('s')) {
        date.add(increment, 'seconds');
    } else if (time.includes('m')) {
        date.add(increment, 'minutes');
    } else if (time.includes('h')) {
        date.add(increment, 'hours');
    } else if (time.includes('d')) {
        date.add(increment, 'days');
    } else if (time.includes('w')) {
        date.add(increment, 'weeks');
    } else if (time.includes('M')) {
        date.add(increment, 'months');
    } else {
        date.add(increment, 'seconds');
    }

    return date;
}

class WhitelistClass {
    set updateExpiryDate(time) {
        var currentDate = moment();
        var date = moment(this.access_expiry_date);

        if (date < currentDate) {
            console.log('The access of [' + this.game_user +'][' + this.twitch_user +'] would have expired on ' + date)
        }

        this.access_expiry_date = addTimeToDate(date, time)
        console.log('There expiry date for [' + this.game_user +'][' + this.twitch_user +'] has been set to ' + this.access_expiry_date)
    }
}

const Whitelist = new Schema({
    game_user: { type: String, unique: true },
    twitch_user: { type: String, unique: true },
    access_type: String,
    premium_account: Boolean,
    uuid: String,
    access_expiry_date: Date
},
{
    timestamps: {
        createdAt: 'created_at' ,
        updatedAt: 'updated_at'
    }
});

Whitelist.loadClass(WhitelistClass);

// Middlewares
Whitelist.post('save', function(error, doc, next) {
    console.log('hola!!')
    if (error.name === 'MongoError' && error.code === 11000) {
        var jsonError = error.keyValue
        next({'error': 'There was a duplicate key error',
                'duplicatedKey': Object.keys(jsonError)[0],
                'duplicatedValue': Object.values(jsonError)[0]
        })
    } else {
        next();
    }
});
Whitelist.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});

module.exports = mongoose.model('Whitelist', Whitelist)