import * as express from 'express';
import passport = require('passport');
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as slash from 'express-slash';
let multipart = require('connect-multiparty');
import {config} from "./config";
import "./models/user";
import "./auth/passport";
import {setupRouter} from './routes/setup.endpoint';
import api from './routes/api';

let app = express();
let port = process.env.PORT || 8080;

//TODO: remove on production
if (process.env.TYPE !== 'prod') {
    mongoose.set('debug', true);
    app.use('/setup', setupRouter);
}

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

//rest api routes
app.use(passport.initialize());
app.use('/api', api);

//static content
let pathes;
if(process.env.TYPE === 'prod'){
    pathes = {
        admin: '../front-end/dist/admin.html',
        all: '../front-end/dist'
    };
}else {
    pathes = {
        admin: '../front-end/admin.html',
        all: '../front-end'
    };
}
app.use('/admin', express.static(pathes.admin));
app.use('/', express.static(pathes.all));

app.use(slash());

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err:any = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use((err: any, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

// development error handler
// will print stacktrace
if (process.env.TYPE !== 'prod') {
    app.use((err:any, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err:any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(port);
console.log('api is running at localhost:' + port);

export default app;