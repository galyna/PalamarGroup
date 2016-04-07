'use strict';

var express = require('express');
var authenticate = require('./authenticate');
var env = require('../config').env;

function authIfDev (req, res, next){
    if(env !== 'debug'){
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
        .get((req, res) => {
            Model.find({}, {__v: 0}).then((users) => {
                res.json(users);
            })
        })
        .post(authIfDev, (req, res) => {
            var artistData = req.body;
            try{
                var artist = new Model(artistData);
            }catch(ex){
                res.status(500).json(ex);
            }
            artist.save().then(()=> {
                res.json(artist);
            }).catch((err)=>{
                res.status(500).json(err);
            })
        });

    routes.route('/:id')
        .get((req,res)=>{
            Model.findOne({_id: req.params.id})
                .then((artist)=>{
                    res.json(artist);
                })
                .catch((err)=>{
                    //TODO: better error handling
                    res.status(404).send();
                });
        })
        .put(authIfDev, (req, res) => {
            var id = req.params.id;
            Model.update({_id: id}, req.body)
                .then(()=>{
                    res.send();
                }).catch((err)=>{
                //TODO: better error handling
                res.status(500).json(err)
            });
        })
        .delete(authIfDev, (req,res) => {
            Model.remove({_id: req.params.id})
                .then(()=>{
                    res.send();
                }).catch((err)=>{
                //TODO: better error handling
                res.status(404).json(err);
            });
        });

    return routes;
}

module.exports = restEndpoint;