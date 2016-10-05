/**
 * Created by Galyna on 05.10.2016.
 */
import {Document, Schema, model} from "mongoose";

export interface ITaskModel extends pg.models.ITask, Document {
    _id: any;
}
let TaskSchema = new Schema( {
    appointment: {type: Schema.Types.ObjectId, ref: 'Appointment'},
    scheduler: {
        start: Date,
        end: Date,
        text: String,
        id: String
    },

} );

export var Task = model<ITaskModel>( 'Task',TaskSchema );
