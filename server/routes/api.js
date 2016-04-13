'use strict';

var express = require('express');
var api = express.Router();
var jwt = require('jsonwebtoken');
var restEndpoint = require('./rest.endpoint');
var userEndpoint = require('./user.endpoint');
var bcrypt = require('bcrypt-nodejs');

//models
var User = require('../models/user');
var Contact = require('../models/contact');
var Course = require('../models/course');
var Order = require('../models/order');


api.post('/authenticate', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(403);
    }
    User.findOne({email: email})
        .then(function (user) {
            if (!user) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(500).send({error: err});
                }
                if (!result) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
                var token = jwt.sign(user._doc, 'secretKey', {
                    expiresIn: 1440 * 60 //1 day
                });
                res.json({
                    token: token,
                    user: {
                        email: user.email,
                        id: user._id
                    }
                });
            });
        })
        .catch(function (err) {
            res.status(500).send({error: err});
        });
});


api.use('/contact', restEndpoint(Contact));
api.use('/course', restEndpoint(Course));
api.use('/order', restEndpoint(Order));
api.use('/user', userEndpoint);

module.exports = api;