/**
 * Created by Galyna on 01.09.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface IFavorModel extends pg.models.IFavor, Document{
    _id: any;
    photo: IPhotoModel,
}


export let FavorSchema = new Schema({
    name: String,
    description:String,
    category: { _id: String, name: String},
    params:[{  name: String,level: { _id: String, name: String,text: String},}],
    defPrice: Number,
    photo: PhotoSchema,
    order: Number
});

export var Favor = model<IFavorModel>('Favor', FavorSchema);