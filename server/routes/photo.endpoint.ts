import authenticate from "../auth/authenticate";
import currentUser from '../auth/current_user';
import config from '../config';
import {Router, Request} from 'express';
let photoApi = Router();
let uuid = require('node-uuid');
let fs = require('fs');

interface IPhotoDeleteRequest extends Request {
    pathToDelete: string;
}

photoApi.route('/')
    .post(authenticate, currentUser.is('admin'), function (req, res, next) {
            if (!req.files || !req.files.file) {
                res.status(400).json({error: {message: 'No files attached'}});
            }
            //TODO: wrong extention
            // else if (false) {
            //     res.status(400).json({error: {message: 'unaccepted file extension'}})
            // }
            //TODO: exceed file size
            // else if (false) {
            //     res.status(400).json({error: {message: 'file exceed size limit'}})
            // }
            else {
                next();
            }
        },
        function (req, res) {
            //TODO: add security handling!!
            let file = req.files.file;
            let ext = file.name.match(/.*\.(\w+)$/)[1];
            let newName = uuid.v4() + '.' + ext;
            let newPath = config.uploadDir + '/' + newName;
            fs.rename(file.path, newPath);
            //TODO: remove hardcode
            res.json({url: "/api/photo/" + newName});
        });

photoApi.route('/:name')
    .get(function (req, res) {
        let fileName = req.params.name;
        let path = config.uploadDir + '/' + fileName;
        res.sendFile(path, function (err) {
            if (err) {
                res.status(err.status).end();
            }
        });
    })
    .delete(authenticate, currentUser.is('admin'),
        function(req: IPhotoDeleteRequest, res, next){
            req.pathToDelete = config.uploadDir + '/' + req.params.name;
            fs.access(req.pathToDelete, function (err) {
                if(err){
                    res.status(404).end();
                }else{
                    next();
                }
            });
        },
        function(req: IPhotoDeleteRequest, res){
            fs.unlink(req.pathToDelete, function(err){
                if(err) {
                    console.log(err);
                    res.status(500);
                }else{
                    res.status(200).end();
                }
            });
        }
    );

export default photoApi;