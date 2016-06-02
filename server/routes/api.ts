import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as restify from 'express-restify-mongoose';
import currentUser from '../auth/current_user';
import userEndpoint from './user.endpoint';
import photoEndpoint from './photo.endpoint';
import * as bcrypt from 'bcrypt-nodejs';
//models
import {User} from '../models/user';
import {Contact} from '../models/contact';
import {Course} from '../models/course';
import {Order} from '../models/order';
import {Model} from '../models/model';
import {SalonClient} from '../models/salon.client';
import {Comment} from '../models/comment';

let api = express.Router();

restify.defaults({
    prefix: '',
    version: '',
    limit: 20, //max and default query limit
    findOneAndUpdate: false,
    findOneAndRemove: false,
    totalCountHeader: true,
    onError: (err, req, res) => {
        const statusCode = req.erm.statusCode; // 400 or 404
        res.status(statusCode).json({
            message: err.message
        });
    },
    // postRead: function (req, res, next) {
    //     const result = req.erm.result;         // unfiltered document, object or array
    //     const statusCode = req.erm.statusCode; // 200
    //
    //     if(statusCode == 200 && Array.isArray(result)){
    //         req.erm.result = {
    //             data: result,
    //             limit: parseInt(req.query.limit) || 20, //TODO: remove hardcode
    //             sort: req.query.sort,
    //             skip: req.query.skip || 0,
    //             totalCount: req.erm.totalCount
    //         }
    //     }
    //     next();
    // }
});


let readOnlyOptions = {
    preCreate: [currentUser.is('admin')],
    preUpdate: [currentUser.is('admin')],
    preDelete: [currentUser.is('admin')]
};

restify.serve(api, Contact, Object.assign({}, readOnlyOptions));
restify.serve(api, Course);
restify.serve(api, Model, Object.assign({}, readOnlyOptions));
restify.serve(api, Order, Object.assign({}, readOnlyOptions));
restify.serve(api, SalonClient, Object.assign({}, readOnlyOptions));
restify.serve(api, Comment, Object.assign({}, readOnlyOptions));
api.use('/user', userEndpoint);
api.use('/photo', photoEndpoint);

api.post('/authenticate', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(403);
    }
    try {
        let user = await User.findOne({email: email});
        if (!user) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send({error: err});
            }
            if (!result) return res.status(403).send({error: {message: 'Wrong email and/or password'}});
            let signOptions = {
                expiresIn: (1440 * 60).toString() //1 day
            };
            let token = jwt.sign(user.toObject(), 'secretKey', signOptions);
            res.json({
                token: token,
                user: {
                    email: user.email,
                    id: user._id
                }
            });
        });
    } catch (err) {
        res.status(500).send({error: err});
    }
});

export default api;