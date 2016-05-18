import {Document, Schema, model} from "mongoose";

interface IOrderModel extends pg.models.IOrderBase, Document {}

//noinspection ReservedWordAsName
let OrderSchema = new Schema({
    name: String, 
    phone: String,
    email: String,
    date: {type:Date, default: Date.now},
    comment:String,
    admin_comment:String,
    event_id: { type: Schema.Types.ObjectId, ref: 'Course' },
    answered: {type:Boolean, default: false},
    booked:{type:Boolean, default: false},
});

export var Order = model<IOrderModel>('Order', OrderSchema);