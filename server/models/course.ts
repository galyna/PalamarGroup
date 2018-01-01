import {Document, Schema, model} from "mongoose";
import {photoService} from "../services/photo.service";
import {IPhotoModel, PhotoSchema} from "./photo.schema";

export interface ICourseModel extends pg.models.ICourse, Document{
    hearFormsPhotos: IPhotoModel[],
    historyPhotos: IPhotoModel[],
    _id: any
}


let VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let DaySchema = new Schema({
    date: Date,
    program: String,
});

let CommentSchema = new Schema({
    name: String,
    text: String,
    date:Date,
    isVisible: {type:Boolean, default: false},
    isModerated: {type:Boolean, default: false},
});

let CourseSchema = new Schema({
    name: String,
    description: String,
    detailsLink: String,
    price: Number,
    order: Number,
    videos: [VideoSchema],
    hearFormsPhotos: [PhotoSchema],
    historyPhotos: [PhotoSchema],
    avatar: String,
    author: {
        name: String,
        photoUrl: String
    },
    days: [DaySchema],
    isVisible: Boolean,
    comments: [CommentSchema]
});

CourseSchema.post('remove', (course:ICourseModel) => {
    try {
        course.historyPhotos.forEach((photo:any)=> {
            photo.remove();
        });
        course.hearFormsPhotos.forEach((photo: any)=> {
            photo.remove();
        });
        photoService.removeByUrl(course.author.photoUrl);
    } catch(err) {
        console.log(err);
    }
});

export var Course = model<ICourseModel>('Course', CourseSchema);
