/**
 * Created by Galyna on 12.10.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";

export interface ISalonModel extends pg.models.ISalon, Document{
    _id: any;
    photo: IPhotoModel[]
}

let VideoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});

let SalonSchema = new Schema({
    name: String,
    phone: String,
    photos: [PhotoSchema],
    address: String,
    latitude: String,
    longitude:String,
    isMain:Boolean,
    isAcademy:Boolean,
    videos: [VideoSchema]
});

export var Salon = model<ISalonModel>('Salon', SalonSchema);
