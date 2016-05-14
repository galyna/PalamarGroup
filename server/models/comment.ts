/**
 * Created by Galyna on 14.05.2016.
 */
import {Document, Schema, model} from "mongoose";

interface ICommentModel extends pg.models.ICommentBase, Document{}

let ICommentSchema = new Schema({
    name: String,
    text: String,
    isVisible: {type:Boolean, default: false},
    answered: {type:Boolean, default: false},
});

export var Comment = model<ICommentModel>('Comment', ICommentSchema);