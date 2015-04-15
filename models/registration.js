/**
 * Created by lokeshg on 4/15/2015.
 */
var mongoose = require('mongoose');
var RegistrationSchema = new mongoose.Schema({
    regid: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registrations', RegistrationSchema);