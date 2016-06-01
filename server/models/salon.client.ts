/**
 * Created by Galyna on 14.05.2016.
 */
import {Document, Schema, model} from "mongoose";

interface ISalonClient extends pg.models.ISalonClient, Document {
    _id: any;
}

let SalonClientSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
});

export var SalonClient = model<ISalonClient>('SalonClient', SalonClientSchema);