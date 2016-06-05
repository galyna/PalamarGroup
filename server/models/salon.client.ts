/**
 * Created by Galyna on 14.05.2016.
 */
import {Document, Schema, model} from "mongoose";

interface ISalonClient extends pg.models.ISalonClient, Document {
    _id: any;
}

//noinspection ReservedWordAsName
let SalonClientSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    group: {type: String, index: true, default: 'global'}
});

export var SalonClient = model<ISalonClient>('SalonClient', SalonClientSchema);
