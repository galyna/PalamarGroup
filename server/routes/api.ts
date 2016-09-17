import * as express from 'express';
import * as restify from 'express-restify-mongoose';
import {currentUser} from '../auth/current_user';
import photoEndpoint from './photo.endpoint';
import {auth} from "../auth/auth";
import passport = require("passport");
import {config} from "../config";
import {paging} from "../services/paging.service";

//models
import {Contact} from '../models/contact';
import {Course} from '../models/course';
import {Order} from '../models/order';
import {Model} from '../models/model';
import {SalonClient} from '../models/salon.client';
import {User} from "../models/user";
import {Master} from "../models/master";
import {Favor} from "../models/favor";
import {Transform} from "../models/transform";

//endpoints
import {emailEndpoint} from "./email.endpoint";
import {orderOptions} from "./order.options";
import {courseApi} from "./course.endpoint";
import {courseGetCommentsApi} from "./comment.endpoint";
import {userOptions, userApi} from "./user.endpoint";
import IOrder = pg.models.IOrder;
import {salonClientApi} from "./salon.client.endpoint";



let api = express.Router();

let restifyDefaults = {
    prefix: '',
    version: '',
    limit: config.defaultQueryLimit, //max and default query limit
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
    postRead: paging.postRead
};

restify.defaults(restifyDefaults);


let readOnlyOptions = {
    preCreate: [auth, currentUser.is('admin')],
    preUpdate: [auth, currentUser.is('admin')],
    preDelete: [auth, currentUser.is('admin')]
};


api.use(paging.preRead);

restify.serve(api, Contact, Object.assign({}, readOnlyOptions));

api.use('/course/comments', courseGetCommentsApi);
api.use('/course/:id', (req: any, res, next) => {
    req.courseId = req.params.id;
    next();
}, courseApi);
restify.serve(api, Course);

api.use('/user', userApi);
restify.serve(api, User, userOptions);

restify.serve(api, Model);
restify.serve(api, Order, orderOptions);
restify.serve(api, Master, readOnlyOptions);
api.use('/salonclient', salonClientApi);
restify.serve(api, SalonClient, Object.assign({}, readOnlyOptions));
restify.serve(api, Favor);
restify.serve(api, Transform);

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