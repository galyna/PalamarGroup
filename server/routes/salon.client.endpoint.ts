import {Router} from "express";
import {SalonClient} from "../models/salon.client";
import {IOptions} from "express-restify-mongoose";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";


export let salonClientOptions: IOptions = {
    preCreate: [auth, currentUser.is( 'academyModerator' )],
    preUpdate: [auth, currentUser.is( 'academyModerator' )],
    preDelete: [auth, currentUser.is( 'academyModerator' )],
 
};

export let salonClientApi = Router();

salonClientApi.get("/groups", async (req, res, next) => {
    try {
        let groups = await SalonClient.find().distinct('group').exec();
        res.json(groups);
    }catch(err){
        next(err);
    }
});