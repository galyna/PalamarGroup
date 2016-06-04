import {Document, Schema, model} from "mongoose";

export interface IContactModel extends pg.models.IContact, Document{
    _id: any;
}

let ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: String,
    address: String,
    isAcademy: Boolean
});

export var Contact = model<IContactModel>('Contact', ContactSchema);