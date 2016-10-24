/**
 * Created by Galyna on 11.10.2016.
 */
import {Document, Schema, model} from "mongoose";

export interface IProductOrderModel extends pg.models.IProductOrder, Document {
    _id: any;
}

//noinspection ReservedWordAsName
let ProductOrderSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    date: { type: Date, default: Date.now },
    comment: String,
    admin_comment: String,
    product: { type: Schema.Types.ObjectId, ref: 'Product'  },
    status: { type: Number, default: 0}
});

export var ProductOrder = model<IProductOrderModel>('ProductOrder', ProductOrderSchema);