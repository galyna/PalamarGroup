var express = require('express');
var app = express();
var config = require('./config');
var api = require('./routes/api');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//rest api routes
app.use('/api', api);

//static content
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));

app.listen(port);
console.log('api is running at localhost:' + port);