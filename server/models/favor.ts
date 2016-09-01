/**
 * Created by Galyna on 01.09.2016.
 */
import {Document, Schema, model} from "mongoose";


export interface IFavorModel extends pg.models.IFavor, Document{
    _id: any;
}


export let FavorSchema = new Schema({
    name: String,
    category: String,
    defPrice: Number
});

export var Favor = model<IFavorModel>('Favor', FavorSchema);