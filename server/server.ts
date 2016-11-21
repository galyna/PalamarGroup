import * as express from 'express';
let passport = require("passport");
let path = require('path');
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as slash from 'express-slash';
let multipart = require('connect-multiparty');
import {botHandler} from './services/snapshots.service';
import {config} from "./config";
import "./models/user";
import "./auth/passport";
import {setupRouter} from './routes/setup.endpoint';

import api from './routes/api';


let app = express();
let port = parseInt(process.env['PORT']) || 8080;
let env = process.env['TYPE'];

//TODO: remove on production
// if (env !== 'prod') {
//     //mongoose.set('debug', true);
//    // app.use('/setup', setupRouter);
// }

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

//rest api routes

app.use(passport.initialize());

app.use('/api', api);
//static content
let pathes;
if (env === 'prod') {
    pathes = {
        admin: '../front-end/dist/admin.html',
        all: '../front-end/dist/',
        content: '../front-end/dist/content/',
        index: '../front-end/dist/index.html'

    };
} else {
    pathes = {
        admin: '../front-end/admin.html',
        all: '../front-end/',
        content: '../front-end/content/',
        index: `..${path.sep}front-end${path.sep}index.html`
    };
}
app.use('/admin', express.static(pathes.admin));
app.use('/content', express.static(pathes.content));


app.use('/', function (req, res, next) {
    botHandler.handleBots(req, res, next);
}, express.static(pathes.all));

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(pathes.index));
});



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
if (env !== 'prod') {
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

app.listen(port, 'localhost', ()=> {
    console.log(`origin: ${config.origin}`);
    console.log(`port: ${port}`);
    console.log(`environment: ${env}`);
});

export default app;