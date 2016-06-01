import * as express from 'express';
import config from './config';
import api from './routes/api';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import {setupRouter} from './routes/setup.endpoint';
let multipart = require('connect-multiparty');

let app = express();
let port = process.env.PORT || 8080;

//TODO: remove on production
if (config.env === 'dev') {
    mongoose.set('debug', true);
    app.use('/setup', setupRouter);
}

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

//rest api routes
app.use('/api', api);

//static content
if(process.env.TYPE == 'prod'){
    app.use('/', express.static('../front-end/dist'));
}else {
    app.use('/', express.static('../front-end'));
}

app.listen(port);
console.log('api is running at localhost:' + port);

export default app;