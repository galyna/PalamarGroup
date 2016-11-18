/**
 * Created by Galyna on 18.11.2016.
 */
/**
 * Created by Galyna on 10.10.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface ISeoPageModel extends pg.models.ISeoPage, Document{
    _id: any;
}


export let SeoPageSchema = new Schema({
    name: String,
    text: String,
    description:String,
    description_ru:String,
    title: String,
    keywords:String,
    keywords_ru:String,
});

export var SeoPage = model<ISeoPageModel>('SeoPage', SeoPageSchema);


