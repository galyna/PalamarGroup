import {Document, Schema, model} from "mongoose";

interface IContactModel extends pg.models.IContact, Document{}

let ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: String,
    address: String
});

export var Contact = model<IContactModel>('Contact', ContactSchema);