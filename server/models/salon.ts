/**
 * Created by Galyna on 12.10.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";

export interface ISalonModel extends pg.models.ISalon, Document{
    _id: any;
    photo: IPhotoModel[]
}

let SalonSchema = new Schema({
    name: String,
    phone: String,
    photos: [PhotoSchema],
    address: String,
    map: String
});

export var Salon = model<ISalonModel>('Salon', SalonSchema);
