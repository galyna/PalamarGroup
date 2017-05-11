/**
 * Created by Galyna on 22.11.2016.
 */
import {Course} from "./models/course";
import {Master} from "./models/master";
import {Favor} from "./models/favor";
var htmlSnapshots = require('html-snapshots');
let schedule = require('node-schedule');
let path = require('path');
let sm = require('sitemap');
let fs = require('fs');
import * as mongoose from 'mongoose';

var pages = ["/",
    "/beauty-salon",
    "/beauty-salon/masters",
    "/beauty-salon/transformations",
    "/beauty-salon/products",
    "/beauty-salon/contacts",
    "/beauty-salon/services/hairdressing",
    "/beauty-salon/services/nail-aesthetics",
    "/beauty-salon/services/makeup",
    "/academy",
    "/academy/calendar",
    "/academy/videos",
    "/academy/contacts",
];

function saveSnapshots() {
    return new Promise((resolve, reject) => {
        console.log("saveSnapshots start " + new Date().toTimeString());

        var result = htmlSnapshots.run({
            input: "sitemap",
            source: path.resolve('../front-end/dist/sitemap.xml'),
            phantomjsOptions: ["--ignore-ssl-errors=true", "--output-encoding=utf8"],
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

function addCollection(courses, urls, reletivePath, date) {
    courses.forEach((p) => {
        urls.push({url: reletivePath + p._id, priority: 0.6, lastmodISO: date, changefreq: 'daily',mobile: true})
    });
}

async function saveSitemap() {
    var date = (new Date()).toISOString();
    var urls = pages.map((url) => {
        return {url: url, priority: 0.8, lastmodISO: date, changefreq: 'hourly',mobile: true};
    });
    console.log("startMakeSnapshots");
    let courses = await Course.find().exec();
    addCollection(courses, urls, "/academy/course/", date);

    let masters = await  Master.find().exec();

    addCollection(masters, urls, "/beauty-salon/master/", date);
    let favors = await  Favor.find().exec();

    addCollection(favors, urls, "/beauty-salon/service/", date);

    var sitemap = sm.createSitemap({
        // todo get from config
        hostname: 'palamar.com.ua',
        cacheTime: 600000,  //600 sec (10 min) cache purge period,
        urls: urls
    });

    fs.writeFileSync(path.resolve('../front-end/dist/sitemap.xml'), sitemap.toString());
    return await saveSnapshots();
}

schedule.scheduleJob({
    hour: 0
}, () => {
    mongoose.connect(process.env.MONGO_URL, () => {
        console.log('saveSitemap started');
        saveSitemap().then(() => {
            console.log('complete');
        }).catch(err => {
            console.error(err);
        });
    });
});
