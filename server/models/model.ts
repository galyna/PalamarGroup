/**
 * Created by Galyna on 14.05.2016.
 */
import {Document, Schema, model} from "mongoose";

interface IModel extends pg.models.IModel, Document{
    _id: any;
}



let ModelSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    fasPhotoUrl:String,
    profilePhotoUrl:String,
    backPhotoUrl:String,
    fullSizePhotoUrl:String,
});

export var Model = model<IModel>('Model', ModelSchema);
