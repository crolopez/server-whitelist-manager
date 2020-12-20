const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost/moderator-panel')
    .then(db => console.log('DB is connected.'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/whitelist', require('./routes/whitelist'))

// Static files
app.use(express.static(__dirname + '/public'))

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port') + '.')
});