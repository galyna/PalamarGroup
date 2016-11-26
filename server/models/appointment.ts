/**
 * Created by Galyna on 02.10.2016.
 */
import {Document, Schema, model} from "mongoose";

export interface IAppointmentModel extends pg.models.IAppointment, Document {
    _id:any;
}

//noinspection ReservedWordAsName
let AppointmentSchema = new Schema( {
    name: String,
    phone: String,
    email: String,
    isConsultation:{type: Boolean, default: false },
    status: {type: Number, default: 0},
    date: {type: Date, default: null},
    creationDate: {type: Date, default: Date.now},
    comment: String,
    admin_comment: String,
    master: {type: Schema.Types.ObjectId, ref: 'Master'},
    favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
    service: {
        favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
        price: Number
    },
    favors: [{
        favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
        price: Number
    }]

} );

export var Appointment = model<IAppointmentModel>( 'Appointment', AppointmentSchema );
