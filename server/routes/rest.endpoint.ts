import {Model} from "mongoose";
import config from '../config';
import {Router} from 'express';
import authenticate from './../auth/authenticate';

function authIfDev (req, res, next){
    if(config.env !== 'dev'){
        authenticate(req,res,next);
    }else{
        next();
    }
}

function restEndpoint(_Model: Model<any>){
    let routes = Router();
    let Model = _Model;
    routes.route('/')
        .get(function(req, res) {
            Model.find({}, {__v: 0}).then(function(users) {
                res.json(users);
            });
        })
        .post(authIfDev, function(req, res) {
            let data = req.body;
            let item;
            try{
                item = new Model(data);
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
        .get(async (req,res) => {
            try {
                let artist = await Model.findOne({_id: req.params.id});
                res.json(artist);
            }catch (err){
                //TODO: better error handling
                res.status(404).send(null);
            }
        })
        .put(authIfDev, async function(req, res) {
            let id = req.params.id;
            let model = await Model.findById(id);
            if(!model) return res.status(404).end();

            Object.assign(model, req.body);
            try {
                await model.save();
                res.send(null);
            } catch(err){
                res.status(500).json(err)
            }
        })
        .delete(authIfDev, async (req,res) => {
            try {
                await Model.remove({_id: req.params.id});
                res.end();
            } catch (err){
                //TODO: better error handling
                res.status(404).json(err);
            }
        });

    return routes;
}

export default restEndpoint;