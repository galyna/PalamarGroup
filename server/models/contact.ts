import {Document, Schema, model} from "mongoose";

interface IContactModel extends pg.models.IContactBase, Document{}

let ContactSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    photo: String,
    address: String,
    isAcademy: Boolean
});

export var Contact = model<IContactModel>('Contact', ContactSchema);