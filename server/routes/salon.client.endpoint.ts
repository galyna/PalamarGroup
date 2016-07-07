import {Router} from "express";
import {SalonClient} from "../models/salon.client";

export let salonClientApi = Router();

salonClientApi.get("/groups", async (req, res, next) => {
    try {
        let groups = await SalonClient.find().distinct('group').exec();
        res.json(groups);
    }catch(err){
        next(err);
    }
});