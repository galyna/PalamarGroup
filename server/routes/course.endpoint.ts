import {Course} from '../models/course';
import * as fs from 'fs';
import config from '../config';
import {Router} from "express";

let courseApi = Router();

courseApi.route('/:_id/hearFormsPhotos')
    .post((req, res) => {
    let _id = req.params._id;
    if (!_id) return res.send(400);

    //TODO: add security handling!!
    let file = req.files.file;
    let ext = file.name.match(/\w+\.(\w+)$/)[1];
    let newName = makeid(10) + '.' + ext;
    let newPath = config.uploadDir + '/' + newName;

    let photoModel = {
        name: req.body.name || newName,
        url: config.uploadsUrl + '/' + newName,
        order: req.body.order || 0
    };

    Course.findOne({_id: _id})
        .then((course) => {
            fs.rename(file.path, newPath);
            return course;
        })
        .then((course) => {
            course.hearFormsPhotos.push(photoModel);
            return course.save();
        })
        .then(() => {
            res.status(201).json(photoModel);
        })
        .catch((err) => {
            res.send(500, err);
        });
});

courseApi.route('/:_id/historyPhotos').post((req, res) => {
    let _id = req.params._id;
    if (!_id) return res.send(400);

    //TODO: add security handling!!
    let file = req.files.file;
    let ext = file.name.match(/\w+\.(\w+)$/)[1];
    let newName = makeid(10) + '.' + ext;
    let newPath = config.uploadDir + '/' + newName;

    let photoModel = {
        name: req.body.name || newName,
        url: config.uploadsUrl + '/' + newName,
        order: req.body.order || 0
    };

    Course.findOne({_id: _id})
        .then((course) => {
            fs.rename(file.path, newPath);
            return course;
        })
        .then((course) => {
            course.historyPhotos.push(photoModel);
            return course.save();
        })
        .then(() => {
            res.status(201).json(photoModel);
        })
        .catch((err) => {
            res.send(500, err);
        });
});

function makeid(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export default courseApi;