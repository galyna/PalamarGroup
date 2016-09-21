import {Document, Schema, model} from "mongoose";

export interface IOrderModel extends pg.models.IOrder, Document {
    _id: any;
}

//noinspection ReservedWordAsName
let OrderSchema = new Schema({
    name: String, 
    phone: String,
    email: String,
    date: { type: Date, default: Date.now },
    comment: String,
    admin_comment: String,
    event_id: { type: Schema.Types.ObjectId, ref: 'Course'  },
    event_name: { type: String},
    event_dates: [Date],
    answered: { type: Boolean, default: false, index: true },
    booked: { type: Boolean, default: false },
});

export var Order = model<IOrderModel>('Order', OrderSchema);