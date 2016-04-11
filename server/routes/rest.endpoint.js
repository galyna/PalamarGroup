'use strict';

var express = require('express');
var authenticate = require('./../auth/authenticate');
var env = require('../config').env;

function authIfDev (req, res, next){
    if(env !== 'dev'){
        authenticate(req,res,next);
    }else{
        next();
    }
}

function restEndpoint(_Model, options){
    //better check if mongoose model
    if(_Model.name !== 'model'){
        throw Error('Invalid argument "_Model". "_Model" must be mongoose.model')
    }
    var routes = express.Router();
    var Model = _Model;
    routes.route('/')
        .get(function(req, res) {
            Model.find({}, {__v: 0}).then(function(users) {
                res.json(users);
            })
        })
        .post(authIfDev, function(req, res) {
            var artistData = req.body;
            try{
                var artist = new Model(artistData);
            }catch(ex){
                res.status(500).json(ex);
            }
            artist.save().then(function() {
                res.json(artist);
            }).catch(function(err) {
                res.status(500).json(err);
            })
        });

    routes.route('/:id')
        .get(function(req,res) {
            Model.findOne({_id: req.params.id})
                .then(function(artist) {
                    res.json(artist);
                })
                .catch(function(err) {
                    //TODO: better error handling
                    res.status(404).send();
                });
        })
        .put(authIfDev, function(req, res) {
            var id = req.params.id;
            Model.update({_id: id}, req.body)
                .then(function() {
                    res.send();
                }).catch(function(err) {
                //TODO: better error handling
                res.status(500).json(err)
            });
        })
        .delete(authIfDev, function(req,res) {
            Model.remove({_id: req.params.id})
                .then(function() {
                    res.send();
                }).catch(function(err) {
                //TODO: better error handling
                res.status(404).json(err);
            });
        });

    return routes;
}

module.exports = restEndpoint;