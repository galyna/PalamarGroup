import {Document, Schema, model} from "mongoose";

interface ICourseModel extends pg.models.ICourseBase, Document{}

let PhotoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let CourseSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    order: Number,
    videos: [VideoSchema],
    hearFormsPhotos: [PhotoSchema],
    historyPhotos: [PhotoSchema],
    author: {
        name: String, 
        photoUrl: String
    },
    courseModulesDates: [Date],
    isVisible: Boolean
});

export var Course = model<ICourseModel>('Course', CourseSchema);