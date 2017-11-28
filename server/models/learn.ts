import {Document, Schema, model} from "mongoose";
import {IPhotoModel, PhotoSchema} from "./photo.schema";

export interface ILearnModel extends pg.models.ILearn, Document{
    photos: IPhotoModel[],
    _id: any
}

let VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let LearnSchema = new Schema({
    name: String,
    order:Number,
    photos: [PhotoSchema],
   videos: [VideoSchema],
});

LearnSchema.post('remove', (learn:ILearnModel) => {
    try {
        learn.photos.forEach((photo:any)=> {
            photo.remove();
        });

    } catch(err) {
        console.log(err);
    }
});

export var Learn = model<ILearnModel>('Learn', LearnSchema);
