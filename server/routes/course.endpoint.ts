import {Course, ICourseModel} from '../models/course';
import config from '../config';
import {Router} from "express";
import authenticate from './../auth/authenticate';
import ICourse = pg.models.ICourse;
import IPhoto = pg.models.IPhoto;
import {IPhotoModel} from "../models/photo.schema";

let api = Router();

function authIfDev (req, res, next){
    if(config.env !== 'dev'){
        authenticate(req,res,next);
    }else{
        next();
    }
}

api.route('/:_id')
    .put(authIfDev, async function(req, res) {
        let id = req.params._id;

        let rawCourse = Object.assign({}, req.body);
        delete rawCourse._id;

        let hearFormsPhotos = rawCourse.hearFormsPhotos;
        delete rawCourse.hearFormsPhotos;

        let historyPhotos = rawCourse.historyPhotos;
        delete rawCourse.historyPhotos;

        let course = await Course.findById(id);
        if(!course) return res.status(404).end();

        Object.assign(course, rawCourse);
        
        processPhotos(course.hearFormsPhotos, hearFormsPhotos);
        processPhotos(course.historyPhotos, historyPhotos);

        try {
            await course.save();
            res.send(null);
        } catch(err){
            res.status(500).json(err)
        }
    });

function processPhotos(originalPhotos: IPhotoModel[], newPhotos: IPhotoModel[]){

    //can't use default values with es6 for some reason
    originalPhotos = originalPhotos || [];
    newPhotos = newPhotos || [];
    
    //remove photos, that are not in newPhotos array
    let newPhotoIds = newPhotos.map(p => p._id);
    originalPhotos.forEach((photo) => {
        if(newPhotoIds.indexOf(photo.id) == -1){
            photo.remove();
        }
    });

    newPhotos.forEach((photo)=>{
        //update photo doc if _id is present
        if(photo._id){
            let originalPhoto = originalPhotos.id(photo._id);
            if (!originalPhoto) return;
            Object.assign(originalPhoto, photo);
        }
        //add photo doc to originalPhotos array if no _id
        else{
            originalPhotos.push(photo);
        }
    });
}

export let courseEndpoint = api;
