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
import {emailEndpoint} from "./email.endpoint";
import IOrder = pg.models.IOrder;
import {orderOptions} from "./order.endpoint";
import {courseApi} from "./course.endpoint";
import {courseGetCommentsApi} from "./comment.endpoint";
import {Request} from "express-serve-static-core";
import {Response} from "express";

let api = express.Router();

let restifyDefaults = {
    prefix: '',
    version: '',
    limit: 20, //max and default query limit
    findOneAndUpdate: false,
    findOneAndRemove: false,
    //distinct queries can't be used with totalCountHeader enabled
    totalCountHeader: true,
    onError: (err, req, res) => {
        const statusCode = req.erm.statusCode; // 400 or 404
        res.status(statusCode).json({
            message: err.message
        });
    },

    postRead: (req, res: Response, next) => {
        if(req.erm.totalCount){
            //TODO: remove hardcode
            let perPage = req.query.perPage || 20;
            let page = req.query.page || 1;
            res.set({
                'X-Total-Count': req.erm.totalCount,
                'X-Per-Page': perPage,
                'X-Page': page
            });
        }
        next();
    }
};

restify.defaults(restifyDefaults);


let readOnlyOptions = {
    preCreate: [currentUser.is('admin')],
    preUpdate: [currentUser.is('admin')],
    preDelete: [currentUser.is('admin')]
};

//expr-mongoose-restify understands only skip/limit
api.use((req, res, next) => {
    //TODO: remove hardcode
    req.query.limit = (req.query.perPage || 20) + '';
    if(req.query.page){
        req.query.skip = (req.query.limit * (req.query.page - 1)) + "";
    }
    next();
});

restify.serve(api, Contact, Object.assign({}, readOnlyOptions));

api.use('/course/comments', courseGetCommentsApi);
api.use('/course/:id', (req: any, res, next) => {
    req.courseId = req.params.id;
    next();
}, courseApi);
restify.serve(api, Course);

restify.serve(api, Model, Object.assign({}, readOnlyOptions));
restify.serve(api, Order, orderOptions);
restify.serve(api, SalonClient, Object.assign({}, readOnlyOptions));

api.use('/user', userEndpoint);
api.use('/photo', photoEndpoint);
api.use('/email', emailEndpoint);

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