import * as express from 'express';
import * as restify from 'express-restify-mongoose';
import passport = require("passport");
import {currentUser} from '../auth/current_user';
import photoEndpoint from './photo.endpoint';

//models
import {Contact} from '../models/contact';
import {Course} from '../models/course';
import {Order} from '../models/order';
import {Model} from '../models/model';
import {SalonClient} from '../models/salon.client';
import {emailEndpoint} from "./email.endpoint";
import IOrder = pg.models.IOrder;
import {orderOptions} from "./order.options";
import {courseApi} from "./course.endpoint";
import {courseGetCommentsApi} from "./comment.endpoint";
import {Response} from "express";
import {User} from "../models/user";
import {auth} from "../auth/auth";
import {userOptions} from "./user.options";

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
    preCreate: [auth, currentUser.is('admin')],
    preUpdate: [auth, currentUser.is('admin')],
    preDelete: [auth, currentUser.is('admin')]
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

restify.serve(api, User, userOptions);
restify.serve(api, Model, Object.assign({}, readOnlyOptions));
restify.serve(api, Order, orderOptions);
restify.serve(api, SalonClient, Object.assign({}, readOnlyOptions));

api.use('/photo', photoEndpoint);
api.use('/email', emailEndpoint);

api.post('/authenticate', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
});

export default api;