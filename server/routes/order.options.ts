import {IOptions} from "express-restify-mongoose";
import {sms} from "../services/sms.service";
import {IOrderModel} from "../models/order";

export let orderOptions: IOptions = {
    postCreate(req:any, res, next) {
        if (process.env.TYPE !== 'prod') return console.trace('Not prod env, skipping sms sending');
        const result = <IOrderModel>req.erm.result;
        //we're not waiting for result here, user don't need it
        sms.sendAdminNotification(` ${result.phone}`).catch(() => {});
        next();
    }
};