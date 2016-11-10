/**
 * Created by Galyna on 05.10.2016.
 */
import {Document, Schema, model} from "mongoose";


export interface ITaskModel extends pg.models.ITask, Document {
    _id:any;
}
let TaskSchema = new Schema( {
    appointment: {
        isDayOff:{type: Boolean, default: false },
        isPreOrder:{type: Boolean, default: false },
        name: String,
        phone: String,
        email: String,
        date: {type: Date, default: Date.now},
        comment: String,
        admin_comment: String,
        isConsultation:{type: Boolean, default: false },
        master: {type: Schema.Types.ObjectId, ref: 'Master'},
        favors: [{
            name: String,
            id: String,
            price: Number,
            photo:String
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
