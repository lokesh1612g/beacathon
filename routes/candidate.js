/**
 * Created by lokeshg on 4/12/2015.
 */
var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');

var mongoose = require('mongoose');
var Candidate = require('../models/candidate.js');
var Registration = require('../models/registration.js');

var sender = new gcm.Sender('AIzaSyCTo72nSGwA036geeSyUtw5MOjzuyePMGU');

/* GET /candidate listing. */
router.get('/', function (req, res, next) {
    Candidate.find(function (err, todos) {
        if (err) return next(err);
        res.json(todos);
    });
});

/* POST /candidate */
router.post('/', function (req, res, next) {
    Candidate.create(req.body, function (err, post) {
        if (err) return next(err);
        var message = new gcm.Message();
        message.addData('candidateadded', post);
        var regIds = [];
        Registration.find().exec(function (err, regids) {
            regids.forEach(function (regid) {
                regIds.push(regid.regid);
            });
            sender.send(message, regIds, function (err, result) {
                if (err) console.error(err);
                else    console.log(result);
                res.json(post);
            });
        });
    });
});

/* GET /candidate/id */
router.get('/:id', function (req, res, next) {
    Candidate.findOne({id:req.params.id}, function (err, post) {
        if (err) return next(err);
        res.json(post.status.toString());
    });
});

/* PUT /candidate/:id */
router.put('/:id', function (req, res, next) {
    /*Candidate.findOneAndUpdate({id:req.params.id}, req.body, function (err, post) {*/
     Candidate.findOneAndUpdate({id:req.params.id}, {$set: {"status":req.query.value}}, function (err, post) {
        if (err) return next(err);
        var message = new gcm.Message();
        message.addData('candidateupdated', req.query.value.toString());
        var regIds = [];
        Registration.find({}, function (err, regids) {
            regids.forEach(function (regid) {
                regIds.push(regid.regid);
            });
            sender.send(message, regIds, function (err, result) {
                if (err) console.error(err);
                else console.log(result);
                res.json(req.body);
            });

        });
    });
});
module.exports = router;