var express = require('express');
var app = express();
var config = require('./config');
var api = require('./routes/api');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var multipart = require('connect-multiparty');
var fs = require('fs');

//TODO: remove on production
if (config.env === 'dev') {
    var setupRouter = require('./routes/setup.endpoint');
    app.use('/setup', setupRouter);
}

mongoose.connect(config.mongoUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multipart());

var Course = require('./models/course');
app.post('/api/course/:_id/hearFormsPhotos', function (req, res, next) {
    var _id = req.params._id;
    if (!_id) return res.send(400);

    //TODO: add security handling!!
    var file = req.files.file;
    var ext = file.name.match(/\w+\.(\w+)/)[1];
    var newName = makeid(10);
    var newPath = config.uploadDir + '/' + newName + '.' + ext;

    var photoModel = {
        name: req.body.name || newName,
        url: '/content/uploads/' + newName + '.' + ext,
        order: req.body.order || 0
    };

    Course.findOne({_id: _id})
        .then(function (course) {
            fs.rename(file.path, newPath);
            return course;
        })
        .then(function (course) {
            course.hearFormsPhotos.push(photoModel);
            return course.save();
        })
        .then(function () {
            res.status(201).json(photoModel);
        })
        .catch(function(err){
            res.send(500, err);
        });
});

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

//rest api routes
app.use('/api', api);

//static content
//TODO: add some concatenation
app.use('/', express.static('../front-end'));
app.use('/node_modules', express.static('../node_modules'));

app.listen(port);
console.log('api is running at localhost:' + port);