/**
 * Created by Galyna on 22.11.2016.
 */
import {Course} from "./models/course";
import {Master} from "./models/master";
import {Favor} from "./models/favor";
import {config} from "./config";
var htmlSnapshots = require('html-snapshots');
let schedule = require('node-schedule');
let path = require('path');
let sm = require('sitemap');
let fs = require('fs');
import * as mongoose from 'mongoose';

var pages = [
    {
        url: "/",
        description: "",
        name: "home",
        text: "Головна",
        title: "PALAMAR GROUP beauty parlour & academy Головна сторінка"
    },
    {
        url: "/beauty-salon",
        description: "",
        name: "home2",
        text: "Головна",
        title: "PALAMAR GROUP beauty parlour & academy Головна сторінка"
    },
    {
        url: "/beauty-salon/masters",
        description: "",
        name: "masters",
        text: "Майстри",
        title: "PALAMAR GROUP beauty parlour & academy Майстри"
    },
    {
        url: "/beauty-salon/transformations",
        description: "",
        name: "transforms",
        text: "Перевтіленні",
        title: "PALAMAR GROUP beauty parlour & academy Перевтілення"
    },
    {
        url: "/beauty-salon/products",
        description: "",
        name: "products",
        text: "Продікція",
        title: "PALAMAR GROUP beauty parlour & academy Продікція"
    },
    {
        url: "/beauty-salon/contacts",
        description: "",
        name: "salon.contacts",
        text: "Контакти салону",
        title: "PALAMAR GROUP beauty parlour & academy Контакти салону"
    },
    {
        url: "/beauty-salon/services/hairdressing",
        description: "",
        name: "hairdressing",
        text: "Перукарські послуги",
        title: "PALAMAR GROUP beauty parlour & academy Перукарські послуги"
    },
    {
        url: "/beauty-salon/services/nail-aesthetics",
        description: "",
        name: "nail-aesthetics",
        text: "Нігтьва естетика",
        title: "PALAMAR GROUP beauty parlour & academy Нігтьва естетика"
    },
    {
        url: "/beauty-salon/services/makeup",
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

function saveSnapshots() {
    return new Promise((resolve, reject)=> {
        console.log("saveSnapshots start " + new Date().toTimeString());

        var result = htmlSnapshots.run({
            input: "sitemap",
            source: path.resolve('../front-end/dist/sitemap.xml'),
            phantomjsOptions: ["--ignore-ssl-errors=true","--output-encoding=utf8"],
            outputDir: './snapshots',
            selector: "#dynamic-content",
            processLimit: 1,
            outputDirClean: true
           // timeout: { "http://palamar.com.ua/": 20000, "__default": 10000 }
        }, function (err, snapshotsCompleted) {
            console.log("snapshots generution finished at" + new Date().toTimeString())
            console.log(snapshotsCompleted.join(','));
            resolve();
        });

    })

}

function addCollection(courses, urls, reletivePath) {
    courses.forEach((p)=> {
        urls.push({url: reletivePath + p._id, priority: 0.6})
    });
}

async function saveSitemap() {
    var urls = pages.map((p)=> {
        return {url: p.url, priority: 0.8};
    });
    console.log("startMakeSnapshots");
    let courses = await Course.find().exec();
    addCollection(courses, urls, "/academy/course/");

    let masters = await  Master.find().exec();

    addCollection(masters, urls, "/beauty-salon/master/");
    let favors = await  Favor.find().exec();

    addCollection(favors, urls, "/beauty-salon/service/");

    var sitemap = sm.createSitemap({
        hostname: config.origin,
        cacheTime: 600000,  //600 sec (10 min) cache purge period,
        urls: urls
    });

    fs.writeFileSync(path.resolve('../front-end/dist/sitemap.xml'), sitemap.toString());
    return await saveSnapshots();
}
// mongoose.connect(config.mongoUrl, ()=>{
//     console.log('saveSitemap started');
//     saveSitemap().then(()=>{
//         console.log('complete');
//     }).catch(err=>{
//         console.error(err);
//     });
// });
//
schedule.scheduleJob({
    hour: 0
}, ()=> {
    mongoose.connect(config.mongoUrl, ()=>{
        console.log('saveSitemap started');
        saveSitemap().then(()=>{
            console.log('complete');
        }).catch(err=>{
            console.error(err);
        });
    });
});
