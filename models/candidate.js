/**
 * Created by lokeshg on 4/12/2015.
 */
var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
    name: String,
    status: Number ,
    id: String,
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidates', CandidateSchema);