/**
 * Created by lokeshg on 4/15/2015.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Registration = require('../models/registration.js');

/* POST /register */
router.post('/', function (req, res, next) {
    console.log("register: " + req.query.regid)
    Registration.find({regid: req.query.regid}, function (err, doc) {
        if (doc.length) {
            res.end();
        }
        else {
            Registration.create({regid:req.query.regid}, function (err, post) {
                if (err) return next(err);
                res.end();
            });
        }
    });
});

module.exports = router;