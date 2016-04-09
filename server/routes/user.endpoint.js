var express = require('express');
var bcrypt = require('bcrypt');
var userApi = express.Router();
var authenticate = require('./../auth/authenticate');
var User = require('../models/user');

userApi.route('/')
    .get(authenticate,function(req, res){
        User.find()
            .then(function(users){
                res.json({users: users});
            })
            .catch(function(err){
                res.status(500);
                res.json(err);
            });
    })
    .post(function(req, res){
        if(!req.body.email || !req.body.password){
            res.status(400).send("email and/or password fields not provided");
            return;
        }
        User.findOne({email: req.body.email}, {email: 1}).then(function(docs){
            if (docs){
                res.status(409).send(new Error("email already registered"));
            }
            bcrypt.hash(req.body.password, 8, function(err, hash) {
                if(err) throw err;

                var user = new User({
                    email: req.body.email,
                    password: hash
                });
                user.save().then(function(){
                    res.status(201).json({
                        email: user.email,
                        id: user._id
                    });
                });
            });

        }).catch(function(err){
            console.log(err);
            res.status(500).send(err);
        })
    });

userApi.route('/:id')
    .get(authenticate,function(req, res){
        User.where({_id: req.params.id}).findOne(function(err, user){
            if(!user){
                res.status(404);
                res.send();
                return;
            }
            res.json(user);
        });
    })
    .delete(authenticate,function(req, res){
        User.where({_id: req.params.id}).remove().then(function(user){
            if(!user) {
                res.status(404)
            }
            res.send();
        })
    })
    .put(authenticate,function(req, res){
        User.where({_id: req.params.id}).findOneAndUpdate({password: req.body.password})
            .then(function(user){
                if(!user) {
                    res.status(404).send({error: {message: "User not found"}});
                }
                res.send();
            });
    });

module.exports = userApi;
