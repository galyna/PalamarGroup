/**
 * Created by Galyna on 17.11.2016.
 */

import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {Router} from "express";
import {botHandler} from '../services/snapshots.service';



export let snapshotEndpoint = Router();


snapshotEndpoint.get("/", auth, currentUser.is('admin'),
    async (req:any, res, next) => {

        try {
            botHandler.saveSnapshots();
            //await user.save();
        }catch(err){
            return next(err);
        }

        res.end();
    });