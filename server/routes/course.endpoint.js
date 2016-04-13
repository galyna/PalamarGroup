var Router = require('express').Router;
var courseApi = Router();
var Course = require('../models/course');
var fs = require('fs');
var config = require('../config');

courseApi.route('/:_id/hearFormsPhotos').post(function (req, res) {
    var _id = req.params._id;
    if (!_id) return res.send(400);

    //TODO: add security handling!!
    var file = req.files.file;
    var ext = file.name.match(/\w+\.(\w+)$/)[1];
    var newName = makeid(10) + '.' + ext;
    var newPath = config.uploadDir + '/' + newName;

    var photoModel = {
        name: req.body.name || newName,
        url: config.uploadsUrl + '/' + newName,
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
        .then(function (course) {
            res.status(201).json(photoModel);
        })
        .catch(function(err){
            res.send(500, err);
        });
});

courseApi.route('/:_id/historyPhotos').post(function (req, res) {
    var _id = req.params._id;
    if (!_id) return res.send(400);

    //TODO: add security handling!!
    var file = req.files.file;
    var ext = file.name.match(/\w+\.(\w+)$/)[1];
    var newName = makeid(10) + '.' + ext;
    var newPath = config.uploadDir + '/' + newName;

    var photoModel = {
        name: req.body.name || newName,
        url: config.uploadsUrl + '/' + newName,
        order: req.body.order || 0
    };

    Course.findOne({_id: _id})
        .then(function (course) {
            fs.rename(file.path, newPath);
            return course;
        })
        .then(function (course) {
            course.historyPhotos.push(photoModel);
            return course.save();
        })
        .then(function (course) {
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

module.exports = courseApi;