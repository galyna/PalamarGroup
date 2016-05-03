import {Document, Schema, Types, model} from "mongoose";

interface IOrderModel extends PG.Models.IOrder, Document {}

//noinspection ReservedWordAsName
let OrderSchema = new Schema({
    name: String, 
    phone: String,
    email: String,
    date: {type:Date, default: Date.now},
    event_name: String,
    event_dates: [Date],
    event_id: { type: Types.ObjectId, ref: 'Course' },
    answered: {type:Boolean, default: false}
});

export var Order = model<IOrderModel>('Order', OrderSchema);