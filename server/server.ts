import * as express from 'express';
import config from './config';
import api from './routes/api';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
let app = express();
let multipart = require('connect-multiparty');
let port = process.env.PORT || 8080;

//TODO: remove on production
if (config.env === 'dev') {
    var setupRouter = require('./routes/setup.endpoint');
    app.use('/setup', setupRouter);
}

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

//rest api routes
app.use('/api', api);

//static content
//TODO: add some concatenation
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));

app.listen(port);
console.log('api is running at localhost:' + port);