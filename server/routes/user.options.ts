import {IOptions} from "express-restify-mongoose";
import {Request} from "express-serve-static-core";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";

export let userOptions: IOptions = {
    preCreate: [auth, currentUser.is('admin')],
    preUpdate: [auth, currentUser.is('admin')],
    preDelete: [auth, currentUser.is('admin')],
    access: function (req: Request) {
        if (req.method.toUpperCase() === "GET") {
            return 'public';
        } else {
            return 'public'
        }
    }
};