/**
 * Created by Galyna on 10.10.2016.
 */
/**
 * Created by Galyna on 01.09.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface IProductModel extends pg.models.IProduct, Document{
    _id: any;
    photo: IPhotoModel,
}


export let ProductSchema = new Schema({
    name: String,
    price: Number,
    description:String,
    photo: PhotoSchema,
});

export var Product = model<IProductModel>('Product', ProductSchema);
