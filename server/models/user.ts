import {Document, Schema, model} from "mongoose";

interface IUserModel extends pg.models.IUserBase, Document{}

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