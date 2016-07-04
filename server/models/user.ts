import {Document, Schema, model} from "mongoose";
import jwt = require('jsonwebtoken');
import bcrypt = require("bcrypt-nodejs");
import {config} from "../config";

const SALT_WORK_FACTOR = 10;

export interface IUserModel extends pg.models.IUser, Document{
    _id: any,
    validPassword: (password: string) => Promise<boolean>,
    generateJwt: () => void
}

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    password: {type:String, required: true, access: 'private'},
    roles: [String]
});

UserSchema.pre("save", function (next) {
    let user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});

UserSchema.methods.validPassword = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, function (err, isMatch) {
            if (err) reject(err);
            resolve(isMatch);
        });
    });
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