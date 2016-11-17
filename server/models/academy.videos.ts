/**
 * Created by Galyna on 17.11.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface IAcademyVideosModel extends pg.models.IAcademyVideos, Document {

    _id:any;

}

let VideoSchema = new Schema( {
    name: String,
    url: String,
    order: Number
} );

let AcademyVideosSchema = new Schema( {
    videos: [VideoSchema],
    name: String,
    order: Number
} );



export var AcademyVideos = model<IAcademyVideosModel>( 'AcademyVideos', AcademyVideosSchema );
