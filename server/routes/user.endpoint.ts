import {IOptions} from "express-restify-mongoose";
import {Request} from "express-serve-static-core";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {Router} from "express";
import {IUserModel, User} from "../models/user";

export let userOptions: IOptions = {
    preCreate: [auth, currentUser.is('admin')],
    preUpdate: [auth, currentUser.is('admin')],
    preDelete: [auth, currentUser.is('admin')],
    access: function (req: Request) {
        if (req.method.toUpperCase() === "GET") {
            return 'public';
        } else {
            return 'private'
        }
    }
};

export let userApi = Router();

userApi.param('id', (req:any, res, next, id) => {
    req.userId = id;
    next();
});

userApi.post("/:id/password", auth, currentUser.is('admin'),
    async (req:any, res, next) => {
        let user: IUserModel;
        let newPassword = req.query.password;
        try {
            user = await User.findOne({_id: req.userId}).exec();
        }catch(err){
            return next(err);
        }
        try {
            user.password = newPassword;
            await user.save();
        }catch(err){
            return next(err);
        }

        res.end();
});