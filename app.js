var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://lokesh1612:iamhere@ds061621.mongolab.com:61621/aprilhackathon', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var candidates = require('./routes/candidate');
app.use('/candidate', candidates);

var registrations = require('./routes/register');
app.use('/register', registrations);


//set server port
app.listen(9000);
console.log('serer is running');
