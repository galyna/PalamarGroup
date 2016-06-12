import config from "../config";
import {SMSAPI, Stat, ISMSAPIOptions} from "e-pochta-sms-api";

let smsOptions: ISMSAPIOptions = config.ePochta.gatewayOptions;
let gateway = new SMSAPI(smsOptions);
let stat = new Stat(gateway);

class SMS {

    private sender: string;
    private adminPhone: string;

    constructor(private _stat: Stat, private config){
        this.sender = config.ePochta.sender;
        this.adminPhone = config.ePochta.adminPhone;
    }

    get stat(){
        return this._stat;
    }
    
    sendAdminNotification(text){
        return stat.sendSMS({sender: this.sender, phone: this.adminPhone, text: text}).then((resp) => {
            console.log(resp);
            return resp;
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }
}

export let sms = new SMS(stat, config);

