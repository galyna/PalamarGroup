"use strict";
var express = require('express');
var config_1 = require('./config');
var api_1 = require('./routes/api');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var multipart = require('connect-multiparty');
var port = process.env.PORT || 8080;
//TODO: remove on production
if (config_1.default.env === 'dev') {
    var setupRouter = require('./routes/setup.endpoint');
    app.use('/setup', setupRouter);
}
mongoose.connect(config_1.default.mongoUrl);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multipart());
//rest api routes
app.use('/api', api_1.default);
//static content
//TODO: add some concatenation
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));
app.listen(port);
console.log('api is running at localhost:' + port);
//# sourceMappingURL=server.js.map