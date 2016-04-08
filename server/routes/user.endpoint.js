var express = require('express');
var userApi = express.Router();
var authenticate = require('./../auth/authenticate');

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
            res.status(400);
        }
        User.where({email: req.body.email}).find(function(docs){
            if (!docs){
                var user = new User({
                    email: req.body.email,
                    password: req.body.password
                });
                user.save().then(function(){
                    res.json({
                        email: user.email,
                        id: user._id
                    });
                });
            }else{
                console.log('user exists: ', req.body.email);
                res.status(500);
                res.json(new Error("User exists!"));
            }
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
                    res.status(404)
                }
                res.send();
            });
    });

module.exports = userApi;
