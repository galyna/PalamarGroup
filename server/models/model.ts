/**
 * Created by Galyna on 14.05.2016.
 */
import {Document, Schema, model} from "mongoose";

interface IModel extends pg.models.IModelBase, Document{}

let PhotoSchema = new Schema({
    name: String,
    url: String,
    order: Number
});


let ModelSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    hearFormsPhotos: [PhotoSchema],

});

export var Model = model<IModel>('Model', ModelSchema);
