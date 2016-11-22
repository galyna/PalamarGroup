import * as express from 'express';
import * as restify from 'express-restify-mongoose';
import {currentUser} from '../auth/current_user';
import photoEndpoint from './photo.endpoint';
import {auth} from "../auth/auth";
let passport = require("passport");
;
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
import {Appointment} from "../models/appointment";
import {Product} from "../models/product";
import {Brend} from "../models/brend";
import {ProductOrder} from "../models/product.order";
import {Salon} from "../models/salon";
import {AcademyVideos} from "../models/academy.videos";

//endpoints
import {emailEndpoint} from "./email.endpoint";
import {orderOptions, modelOptions} from "./order.options";
import {courseApi, coursesOptions} from "./course.endpoint";
import {courseGetCommentsApi} from "./comment.endpoint";
import {userOptions, userApi} from "./user.endpoint";
import IOrder = pg.models.IOrder;
import {salonClientApi, salonClientOptions} from "./salon.client.endpoint";
import {tasksOptions, tasksApi} from './tasks.endpoint';
import {appointmentOptions} from './appointment.options';

import {SeoPage} from "../models/seo.page";

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

restify.serve(api, Contact, coursesOptions);

api.use('/course/comments', courseGetCommentsApi);
api.use('/master/:id', (req: any, res, next) => {
    req.masterId = req.params.id;
    next();
}, tasksApi);

api.use('/course/:id', (req: any, res, next) => {
    req.courseId = req.params.id;
    next();
}, courseApi);
restify.serve(api, Course, coursesOptions);

api.use('/user', userApi);
restify.serve(api, User, userOptions);
restify.serve(api, Master, tasksOptions);
restify.serve(api, Model, modelOptions);
restify.serve(api, Order, orderOptions);
restify.serve(api, AcademyVideos, orderOptions);
restify.serve(api, ProductOrder, appointmentOptions);
restify.serve(api, Appointment, appointmentOptions);
api.use('/salonclient', salonClientApi);
restify.serve(api, SalonClient, salonClientOptions);
restify.serve(api, Favor, tasksOptions);
restify.serve(api, Transform, tasksOptions);
restify.serve(api, Product, tasksOptions);
restify.serve(api, Brend, tasksOptions);
restify.serve(api, Salon, tasksOptions);
restify.serve(api, SeoPage);
api.use('/photo', photoEndpoint);
api.use('/email', emailEndpoint);
api.use('/stubs', (req: any, res, next) => {

    try {
        var pages = [
            {
                url: "/",
                description: "",
                name: "home",
                text: "Головна",
                title: "PALAMAR GROUP beauty parlour & academy Головна сторінка"
            },
            {
                url: "/beauty-parlour/services",
                description: "",
                name: "services",
                text: "Послуги",
                title: "PALAMAR GROUP beauty parlour & academy Послуги"
            },
            {
                url: "/beauty-parlour/masters",
                description: "",
                name: "masters",
                text: "Майстри",
                title: "PALAMAR GROUP beauty parlour & academy Майстри"
            },
            {
                url: "/beauty-parlour/transformations",
                description: "",
                name: "transforms",
                text: "Перевтіленні",
                title: "PALAMAR GROUP beauty parlour & academy Перевтілення"
            },
            {
                url: "/beauty-parlour/products",
                description: "",
                name: "products",
                text: "Продікція",
                title: "PALAMAR GROUP beauty parlour & academy Продікція"
            },
            {
                url: "/beauty-parlour/contacts",
                description: "",
                name: "salon.contacts",
                text: "Контакти салону",
                title: "PALAMAR GROUP beauty parlour & academy Контакти салону"
            },
            {
                url: "/services/hairdressing",
                description: "",
                name: "hairdressing",
                text: "Перукарські послуги",
                title: "PALAMAR GROUP beauty parlour & academy Перукарські послуги"
            },
            {
                url: "/services/nail-aesthetics",
                description: "",
                name: "nail-aesthetics",
                text: "Нігтьва естетика",
                title: "PALAMAR GROUP beauty parlour & academy Нігтьва естетика"
            },
            {
                url: "/services/makeup",
                description: "",
                name: "makeup",
                text: "Візаж",
                title: "PALAMAR GROUP beauty parlour & academy Візаж"
            },
            {
                url: "/academy",
                description: "",
                name: "academy",
                text: "Академія курси",
                title: "PALAMAR GROUP beauty parlour & academy Програма навчання"
            },
            {
                url: "/academy/calendar",
                description: "",
                name: "calendar",
                text: "Академія календар",
                title: "PALAMAR GROUP beauty parlour & academy Календар навчання"
            },
            {
                url: "/academy/videos",
                description: "",
                name: "video",
                text: "Академія відео",
                title: "PALAMAR GROUP beauty parlour & academy Академія Відео"
            },
            {
                url: "/academy/contacts",
                description: "",
                name: "academy.contacts",
                text: "Академія контакти",
                title: "PALAMAR GROUP beauty parlour & academy Академія контакти"
            }].forEach((p)=> {
            p.description = "Студія краси та навчальний центр для працівників салонів краси. м. Львів"
            SeoPage.create(p);
        })
        res.end();
        //await user.save();
    } catch (err) {
        return next(err);
    }

});

api.post('/authenticate', (req, res, next) => {

    passport.authenticate('local', (err, user, info) => {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res, next);
});

export default api;