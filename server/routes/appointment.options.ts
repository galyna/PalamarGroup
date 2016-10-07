/**
 * Created by Galyna on 07.10.2016.
 */
import {IOptions} from "express-restify-mongoose";
import {Request} from "express-serve-static-core";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";



export let appointmentOptions:IOptions = {
    preUpdate: [auth, currentUser.is( 'salonModerator' )],
    preDelete: [auth, currentUser.is( 'salonModerator' )],
    access: function (req:Request) {
        return 'public';
    }
};