/**
 * Created by Galyna on 17.09.2016.
 */
import {Document, Schema, model} from "mongoose";
import {photoService} from "../services/photo.service";
import {IPhotoModel, PhotoSchema} from "./photo.schema";

export interface ITransformModel extends pg.models.ITransform, Document{
    photos: IPhotoModel[],
    _id: any
}


let VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let TransformSchema = new Schema({
    name: String,
    order:Number,
    videos: [VideoSchema],
    photos: [PhotoSchema],
   
});

 TransformSchema.post('remove', (transform:ITransformModel) => {
    try {
        transform.photos.forEach((photo:any)=> {
            photo.remove();
        });
     
    } catch(err) {
        console.log(err);
    }
});

export var Transform = model<ITransformModel>('Transform', TransformSchema);
