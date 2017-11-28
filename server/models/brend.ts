/**
 * Created by Galyna on 10.10.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface IBrendModel extends pg.models.IBrend, Document{
    _id: any;
    photo: IPhotoModel,
}


export let BrendSchema = new Schema({
    name: String,
    description: String,
    url:String,
    photo: PhotoSchema,
});

export var Brend = model<IBrendModel>('Brend', BrendSchema);

