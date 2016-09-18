import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";

export interface IContactModel extends pg.models.IContact, Document{
    _id: any;
    photo: IPhotoModel
}

let ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: PhotoSchema,
    address: String,
    isAcademy: Boolean
});

export var Contact = model<IContactModel>('Contact', ContactSchema);