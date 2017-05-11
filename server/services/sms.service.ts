import {SMSAPI, Stat, ISMSAPIOptions} from "e-pochta-sms-api";

let smsOptions: ISMSAPIOptions = {
    publicKey: process.env.EPOCHTA_PUBLIC_KEY,
    privateKey: process.env.EPOCHTA_PRIVATE_KEY,
    url: process.env.EPOCHTA_URL
};
let gateway = new SMSAPI(smsOptions);
let stat = new Stat(gateway);

class SMS {

    private sender: string;
    private adminPhone: string;

    constructor(private _stat: Stat){
        this.sender = process.env.EPOCHTA_SENDER;
        this.adminPhone = process.env.EPOCHTA_ADMIN_PHONE;
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

export let sms = new SMS(stat);

