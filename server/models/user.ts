import {Document, Schema, model} from "mongoose";
import crypto = require("crypto");
import jwt = require('jsonwebtoken');
import {config} from "../config";

interface IUserModel extends pg.models.IUser, Document{
    _id: any,
    setPassword: (password) => void,
    validPassword: (password) => boolean,
    generateJwt: () => void
}

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    roles: [String]
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    if(!this.hash || !this.salt){
        return false;
    }
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        roles: this.roles,
        exp: expiry.getTime() / 1000
    }, config.appSecret, {});
};

export let User = model<IUserModel>('User', UserSchema);