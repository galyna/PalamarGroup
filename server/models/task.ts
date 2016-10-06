/**
 * Created by Galyna on 05.10.2016.
 */
import {Document, Schema, model} from "mongoose";
import {PhotoSchema} from "./photo.schema";

export interface ITaskModel extends pg.models.ITask, Document {
    _id:any;
}
let TaskSchema = new Schema( {
    appointment: {
        name: String,
        phone: String,
        email: String,
        date: {type: Date, default: Date.now},
        comment: String,
        admin_comment: String,
        master: {type: Schema.Types.ObjectId, ref: 'Master'},
        favors: [{
            name: String,
            photo: PhotoSchema,
            id: String,
            price: Number,

        }],
    },
    scheduler: {
        start: Date,
        end: Date,
        text: String,
        id: String,
        borderColor:String,
        barColor:String
    },

} );

export var Task = model<ITaskModel>( 'Task', TaskSchema );
