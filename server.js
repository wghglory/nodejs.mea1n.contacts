'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', require('./routers/main'));  //show index
app.use('/contact', require('./routers/contact'));  //contact CRUD api

// mongod --dbpath=/Users/derek/Work/Bitbucket/MEAN_Contact/db --port=27019
mongoose.Promise = global.Promise;

var db = mongoose
    .connect('mongodb://localhost:27019/contact', {
        useMongoClient: true,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
    })
    .then(
        () => {
            app.listen(3000);
            console.log('Server running on port 3000');
        },
        (err) => {
            console.log('failed to connect to db');
        },
    );
