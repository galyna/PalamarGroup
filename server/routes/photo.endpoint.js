"use strict";
var authenticate_1 = require("../auth/authenticate");
var current_user_1 = require('../auth/current_user');
var config_1 = require('../config');
var express = require('express');
var photoApi = express.Router();
var uuid = require('node-uuid');
var fs = require('fs');
photoApi.route('/')
    .post(authenticate_1.default, current_user_1.default.is('admin'), function (req, res, next) {
    if (!req.files || !req.files.file) {
        res.status(400).json({ error: { message: 'No files attached' } });
    }
    else {
        next();
    }
}, function (req, res) {
    //TODO: add security handling!!
    var file = req.files.file;
    var ext = file.name.match(/\w+\.(\w+)$/)[1];
    var newName = uuid.v4() + '.' + ext;
    var newPath = config_1.default.uploadDir + '/' + newName;
    fs.rename(file.path, newPath);
    //TODO: remove hardcode
    res.json({ url: "/api/photo/" + newName });
});
photoApi.route('/:name')
    .get(function (req, res) {
    var fileName = req.params.name;
    var path = config_1.default.uploadDir + '/' + fileName;
    res.sendFile(path, function (err) {
        if (err) {
            res.status(err.status).end();
        }
    });
})
    .delete(authenticate_1.default, current_user_1.default.is('admin'), function (req, res, next) {
    req.pathToDelete = config_1.default.uploadDir + '/' + req.params.name;
    fs.access(req.pathToDelete, function (err) {
        if (err) {
            res.status(404).end();
        }
        else {
            next();
        }
    });
}, function (req, res) {
    fs.unlink(req.pathToDelete, function (err) {
        if (err) {
            console.log(err);
            res.status(500);
        }
        else {
            res.status(200).end();
        }
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = photoApi;
//# sourceMappingURL=photo.endpoint.js.map