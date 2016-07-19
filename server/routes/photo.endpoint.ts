import {currentUser} from '../auth/current_user';
import {Router} from 'express';
import {photoService} from '../services/photo.service';
import {auth} from "../auth/auth";
let photoApi = Router();
let uuid = require('node-uuid');
let fs = require('fs');

photoApi.route('/')
    .post(function (req, res, next) {
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
        async function (req, res) {
            //TODO: add security handling!!
            let newName = await photoService.create(req.files.file.path);
            //TODO: remove hardcode
            res.json({url: "/api/photo/" + newName});
        });

photoApi.route('/:name')
    .get(function (req, res) {
        let path = photoService.path(req.params.name);
        res.sendFile(path, function (err) {
            if (err) {
                res.status(err.status).end();
            }
        });
    })
    .delete(auth, currentUser.is('admin'),
        async function(req, res){
            try{
                await photoService.remove(req.params.name);
                res.status(200).end();
            }catch (err){
                res.status(404).end();
            }
        }
    );

export default photoApi;