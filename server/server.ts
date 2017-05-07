require('dotenv-safe').load();
import * as express from 'express';
let passport = require("passport");
let path = require('path');
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as slash from 'express-slash';
let multipart = require('connect-multiparty');
import "./models/user";
import "./auth/passport";
import api from './routes/api';
import {ENVIRONMENTS} from './constants'
let app = express();
let port = process.env['PORT'];
let env = process.env['NODE_ENV'];

mongoose.connect(process.env['MONGO_URL']);
// mongoose.Promise = require('bluebird');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

//rest api routes
app.use(passport.initialize());
app.use('/', api);

//static content
// let pathes;
// if (env === 'prod') {
//     pathes = {
//         admin: '../front-end/dist/admin.html',
//         all: '../front-end/dist/',
//         content: '../front-end/dist/content/',
//         index: '../front-end/dist/index.html',
//         robots:'../front-end/dist/robots.txt',
//         sitemap:'../front-end/dist/sitemap.xml',
//
//     };
// } else {
//     pathes = {
//         admin: '../front-end/admin.html',
//         all: '../front-end/',
//         sitemap:'../front-end/dist/sitemap.xml',
//         content: '../front-end/content/',
//         robots:'../front-end/dist/robots.txt',
//         index: `..${path.sep}front-end${path.sep}index.html`
//     };
// }
// app.use('/admin', express.static(pathes.admin));
// app.use('/content', express.static(pathes.content));

// app.use('/robots.txt', function (req, res, next) {
//     res.sendFile(path.resolve(pathes.robots));
// });
// app.use('/sitemap.xml', function (req, res, next) {
//     res.sendFile(path.resolve(pathes.sitemap));
// });

// let isBot = require('isbot');
// const phantomRegex = /(phantom)/i;
// //app.use('/',  express.static(pathes.all));
// app.use('/', function (req, res, next) {
//     const userAgent = req.headers['user-agent'];
//     if ( !phantomRegex.test(userAgent) && isBot(userAgent)) {
//         res.sendFile(path.resolve('./snapshots', req.url.replace(/(^\/{1,}|\/{1,}$|\/{0,}\?.*|\/{0,}\%.*)/g, ''), 'index.html'));
//     } else {
//         next();
//     }
// }, express.static(pathes.all));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use((err: any, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message": err.name + ": " + err.message});
    } else {
        next(err);
    }
});


// development error handler
// will print stacktrace
if ((env === ENVIRONMENTS.PROD) || (env === ENVIRONMENTS.DEV)) {
    app.use((err: any, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

const server = app.listen(port, ()=> {
    console.log(`NODE_ENV: '${env}'`);
    console.log(`express listening on '${server.address().address}:${server.address().port}'`);
});



export default app;
