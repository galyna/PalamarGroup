"use strict";
var express = require('express');
var jwt = require('jsonwebtoken');
var rest_endpoint_1 = require('./rest.endpoint');
var user_endpoint_1 = require('./user.endpoint');
var course_endpoint_1 = require('./course.endpoint');
var photo_endpoint_1 = require('./photo.endpoint');
var bcrypt = require('bcrypt-nodejs');
//models
var user_1 = require('../models/user');
var contact_1 = require('../models/contact');
var course_1 = require('../models/course');
var order_1 = require('../models/order');
var api = express.Router();
api.post('/authenticate', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email || !password) {
        return res.status(403);
    }
    user_1.default.findOne({ email: email })
        .then(function (user) {
        if (!user)
            return res.status(403).send({ error: { message: 'Wrong email and/or password' } });
        bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (err) {
                return res.status(500).send({ error: err });
            }
            if (!result)
                return res.status(403).send({ error: { message: 'Wrong email and/or password' } });
            var signOptions = {
                expiresIn: (1440 * 60).toString() //1 day
            };
            var token = jwt.sign(user._doc, 'secretKey', signOptions);
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
        res.status(500).send({ error: err });
    });
});
api.use('/contact', rest_endpoint_1.default(contact_1.default));
api.use('/course', course_endpoint_1.default, rest_endpoint_1.default(course_1.default));
api.use('/order', rest_endpoint_1.default(order_1.default));
api.use('/user', user_endpoint_1.default);
api.use('/photo', photo_endpoint_1.default);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = api;
//# sourceMappingURL=api.js.map