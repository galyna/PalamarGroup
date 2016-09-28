import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";
import {FavorSchema} from "./favor";


export interface IMasterModel extends pg.models.IMaster, Document {
    photo:IPhotoModel,
    works:IPhotoModel[]
}

let MasterSchema = new Schema( {
    name: String,
    photo: PhotoSchema,
    services: [{
        favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
        price: Number
    }],
    tasks: [{
        order:{type: Schema.Types.ObjectId, ref: 'Order'},
        scheduler: {
            start: Date,
            end: Date,
            text: String,
            id: String
        },
        favors: [{
            favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
            price: Number
        }],
    }],
    works: [PhotoSchema],
    contacts: {
        phone: String,
        facebook: String,
    }
} );

MasterSchema.post( 'remove', (master:IMasterModel) => {
    try {
        master.photo.remove();
        master.works.forEach( (photo)=> {
            photo.remove();
        } );
    } catch (err) {
        console.log( err );
    }
} );

export var Master = model<IMasterModel>( 'Master', MasterSchema );