import * as express from 'express';
import * as restify from 'express-restify-mongoose';
import {currentUser} from '../auth/current_user';
import photoEndpoint from './photo.endpoint';
import {auth} from "../auth/auth";
let passport = require("passport");
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
    limit: process.env.DEFAULT_QUERY_LIMIT, //max and default query limit
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
                "url": "/",
                "description": "Студія краси та навчальний центр для працівників салонів краси. Львів. Стрижка та інші перукарські послуги, а також манікюр, візаж, педікюр.",
                "name": "home",
                "text": "Головна",
                "title": "PALAMAR GROUP Салон краси Юлії Паламар Львів",
                "description_ru": "Студия и учебный центр для работников салонов красоты. Львов. Стрижка и другие парикмахерские услуги, а также маникюр, визаж, педикюр.",
                "keywords": "стрижка Львів, паламар групб салон краси, ТЦ Південний, студія краси, манікюр, педікюр, мейкап,макіяж,Паламар груп",
                "keywords_ru": "стрижка Львов,паламар групбсалон красоты, ТЦ Южный, студия красоты, маникюр, педикюр, макияж,Паламар груп"

            },
            {
                url: "/beauty-salon/masters",
                description: "Список команди працівників салону з вказанням послуг, яку надає майстер та можливістю записатусь на процедуру чи консультацію",
                name: "masters",
                text: "Команда",
                title: "Команда салону краси Юлії Паламар PALAMAR GROUP Львів",
                description_ru:"Список  работников салона с указанием услуг, которую предоставляет мастер и возможностью записатусь на процедуру или консультацию"
            },
            {
                "url": "/services/hairdressing",
                "description": "Ціна стрижки від 300 грн. Послуги: чоловіча стрижка, жіноча стрижка, дитяча стрижка, фарбувоння, зачіска, укладка, плетіння, лікувальні процедури",
                "name": "hairdressing",
                "text": "Перукарські послуги",
                "title": "Стрижка та інші перукарські послуги від салону PALAMAR  GROUP",
                "description_ru": "Цена стрижки от 300 грн. Услуги: мужская стрижка, женская стрижка, детская стрижка, фарбувоння, прическа, укладка, плетение, лечебные процедуры"
            },
            {
                "url": "/services/nail-aesthetics",
                "description": "Ціна від 200 грн. Послуги: класичний манікюр, європейський манікюр, дитячий манікюр, апаратний манікюр, класичний та апаратний педікюр, парафінотерапія",
                "name": "nail-aesthetics",
                "text": "Нігтьва естетика",
                "title": "Манікюр та педикюр від салону PALAMAR GROUP Львів",
                "description_ru": "Цена от 200 грн. Услуги: классический маникюр, европейский маникюр, детский маникюр, аппаратный маникюр, классический и аппаратный педикюр, парафинотерапия"
            },
            {
                "url": "/services/makeup",
                "description": "Вартість візажу від 200 грн. Послуги: корекція брів (100 грн), фарбування брів, денний, вечірній, весільний візаж, ламінування вій.",
                "name": "makeup",
                "text": "Візаж",
                "title": "Візаж від салону краси PALAMAR. Ціна від 200 грн.",
                "description_ru": "Стоимость визажа от 200 грн. Услуги: корекция бровей, окрашевание бровей, дневной, вечерний, свадебный визаж,  ламинирование ресниц.",
                "keywords": "Вартість візажу від 200 грн,денний, вечірній, весільний візаж, корекція і покраска брів, ламінування вій",
                "keywords_ru": "Стоимость визажа от 200 грн, дневной, вечерний, свадебный визаж, корекция и окрашевание бровей, ламинирование ресниц"
            },
            {
                url: "/beauty-salon/transformations",
                description: "Фото до та після зміни образу наших клієнтів. Відео процесу перевтілення",
                name: "transforms",
                text: "ЗМІНА ОБРАЗУ",
                title: "Зміна образу клієнта у салоні краси Юлії Паламар PALAMAR GROUP",
                description_ru:"Фото до и после изменения образа наших клиентов. Видео процесса перевоплощения"
            },
            {
                url: "/beauty-salon/products",
                description: "Салон рекомендує засоби для догляду за волоссям та пропонує замовити їх на сайті салону",
                name: "products",
                text: "Продукція",
                title: "Засоби для догляду за волоссям від салону PALAMAR  GROUP Львів",
                description_ru: "Салон рекомендует средства для ухода за волосами и предлагает заказать их на сайте салона"
            },
            {
                url: "/beauty-salon/contacts",
                description: "Телефони адміністраторів, розміщення на карті, фото та відео про те як дістатись до салону. Львів, ТЦ ПІВДЕННИЙ ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ",
                name: "salon.contacts",
                text: "Контакти салону",
                title: "Контакти салону Юлії Паламар PALAMAR GROUP Львів",
                description_ru: "Телефоны администраторов, расположение на карте, фото и видео о том как добраться до салона. Львов, ТЦ ЮЖНЫЙ ТЦ «ГАЛЕРЕЯ» ВТОРОЙ ЭТАЖ № СТУДИЯ"
            },
            {
                "url": "/academy",
                "description": "Ціна курсу від 3000 грн. Навчальння включає теоретично-практичні курси для перукарів ,а також курси з колористики та фешн стилістики.",
                "name": "academy",
                "text": "Академія курси",
                "title": "Курси для перукарів та стилістів PALAMAR GROUP ACADEMY Львів",
                "description_ru": "Цена курса 3000 грн. Обучающие включает теоретико-практические курсы для парикмахеров, а также курсы по колористике и фэшн стилистики."
            },
            {
                url: "/academy/calendar",
                "description": "Ціна курсу від 3000 грн. Навчальна програма курсів для перукарів та стилістів у вигляді  календаря. В можете дізнатись які курси проволяться у цьому місяці.",
                name: "calendar",
                text: "Академія календар",
                "title": "Календар курсів для перукарів та стилістів PALAMAR GROUP ACADEMY",
                "description_ru": "Цена курса 3000 грн. Учебная программа курсов для парикмахеров и стилистов в виде календаря. В можете узнать какие курсы проволяться в этом месяце."
            },
            {
                "url": "/academy/videos",
                "description": "Відеоматеріали навчальних курсів з перукарського мистецтва, колористики та фешн стилістики . Відео з відпрацювань стрижок",
                "name": "video",
                "text": "Академія відео",
                "title": "PALAMAR GROUP ACADEMY Відео з курсів",
                "description_ru": "Видеоматериалы учебных курсов по парикмахерскому искусству, колористики и фэшн стилистики. Видео с отработок стрижек"
            },
            {
                url: "/academy/contacts",
                description: "Телефон координатора курсів для перукарів та стилістів PALAMAR GROUP ACADEMY від Юлії Паламар та розміщення академії на карті",
                name: "academy.contacts",
                text: "Академія контакти",
                title: "Контакти навчального центру PALAMAR GROUP ACADEMY",
                "description_ru": "Телефон координатора курсов для парикмахеров и стилистов PALAMAR GROUP ACADEMY от Юлии Паламар и положение академии на карте."

            }].forEach((p) => {
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
