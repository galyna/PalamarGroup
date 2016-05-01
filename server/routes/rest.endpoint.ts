import {Model} from "mongoose";
import config from '../config';

var express = require('express');
var authenticate = require('./../auth/authenticate');

function authIfDev (req, res, next){
    if(config.env !== 'dev'){
        authenticate(req,res,next);
    }else{
        next();
    }
}

function restEndpoint(_Model: Model<any>){
    var routes = express.Router();
    var Model = _Model;
    routes.route('/')
        .get(function(req, res) {
            Model.find({}, {__v: 0}).then(function(users) {
                res.json(users);
            })
        })
        .post(authIfDev, function(req, res) {
            var data = req.body;
            try{
                var item = new Model(data);
            }catch(ex){
                res.status(500).json(ex);
            }
            item.save().then(function() {
                res.json(item);
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
                .catch(function() {
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

export default restEndpoint;