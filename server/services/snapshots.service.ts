import {Course} from "../models/course";
import {Master} from "../models/master";
import {Favor} from "../models/favor";
import {config} from "../config";

let isBot = require('isbot');
let path = require('path');
let sm = require('sitemap');
let fs = require('fs');
var htmlSnapshots = require('html-snapshots');
export class SnapshotsService {

    pages = [
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
        }];

    constructor() {

    }

    handleBots(req, res, next) {

        if (isBot(req.headers['user-agent'])) {
            res.sendFile(path.resolve('./snapshots', req.url.replace(/^\/|\/$/g, ''), 'index.html'));
        } else {
            next();
        }
    }


    saveSnapshots( res, next) {
        console.log("saveSnapshots start " + new Date().toTimeString());

            var result = htmlSnapshots.run({
                input: "sitemap",
                port: "8080",
                source: path.resolve('../front-end/dist/sitemap.xml'),
                phantomjsOptions: [ "--ignore-ssl-errors=true","--debug=true"],
                outputDir: './snapshots',
                selector: "#dynamic-content",
                processLimit: 1
            }, function (err, snapshotsCompleted) {
                console.log("snapshots generution finished at" + new Date().toTimeString())
                console.log(snapshotsCompleted.join(','));
                res.json(snapshotsCompleted);
            });

    }


    addCollection(courses, urls, reletivePath) {
        courses.forEach((p)=> {
            urls.push({url: reletivePath + p._id, priority: 0.6})
        });
    }

    saveSitemap(res, next) {


        var urls = this.pages.map((p)=> {
            return {url: p.url, priority: 0.8};
        });

        try {
            Course.find().exec().then((courses)=> {
                this.addCollection(courses, urls, "/academy/course/");

                Master.find().exec().then((masters)=> {
                    this.addCollection(masters, urls, "/beauty-parlour/master/");

                    Favor.find().exec().then((favors)=> {
                        this.addCollection(favors, urls, "/beauty-parlour/service/");

                        var sitemap = sm.createSitemap({
                            hostname: config.origin,
                            cacheTime: 600000,  //600 sec (10 min) cache purge period,
                            urls: urls
                        });

                        fs.writeFileSync(path.resolve('../front-end/dist/sitemap.xml'), sitemap.toString());
                        this.saveSnapshots( res, next);

                    });
                });
            });


        } catch (err) {
            return next(err);
        }

    }

    getpages() {
        return this.pages;
    }

    createShot() {


    }
}
export let botHandler = new SnapshotsService();
