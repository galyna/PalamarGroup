import {Document, Schema, model} from "mongoose";

interface IUserModel extends PG.Models.IUser, Document{}

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    roles: [String]
});

export var User = model<IUserModel>('User', UserSchema);