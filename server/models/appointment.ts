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
    date: {type: Date, default: Date.now},
    comment: String,
    admin_comment: String,
    master: {type: Schema.Types.ObjectId, ref: 'Master'},
    favors: [{
        favor: {type: Schema.Types.ObjectId, ref: 'Favor'},
        price: Number
    }],
    answered: {type: Boolean, default: false, index: true},
    booked: {type: Boolean, default: false}

} );

export var Appointment = model<IAppointmentModel>( 'Appointment', AppointmentSchema );
