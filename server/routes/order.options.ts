import {IOptions} from "express-restify-mongoose";
import {sms} from "../services/sms.service";
import {IOrderModel} from "../models/order";

export let orderOptions: IOptions = {
    postCreate: (req:any, res, next) => {
        const result = <IOrderModel>req.erm.result;
        //we're not waiting for result here, user don't need it
        sms.sendAdminNotification(`${result.event_name}. ${result.phone}`).catch(() => {});
        next();
    }
};