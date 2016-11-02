import {Document, Schema, model} from "mongoose";
import {PhotoSchema, IPhotoModel} from "./photo.schema";


export interface IMasterModel extends pg.models.IMaster, Document {
    photo:IPhotoModel,
    works:IPhotoModel[],
    _id:any;

}

let VideoSchema = new Schema( {
    name: String,
    url: String,
    order: Number
} );

let MasterSchema = new Schema( {
    name: String,
    description: String,
    order: Number,
    photo: PhotoSchema,
    isTop:Boolean,
    services: [{
        favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
        price: Number,
        level: { _id: String, name: String,text: String},
    }],
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    works: [PhotoSchema],
    videos: [VideoSchema],
    rate: { _id: String, name: String,text: String}
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