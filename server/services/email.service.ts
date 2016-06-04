import * as nodemailer from 'nodemailer';
import {XOAuth2GeneratorOptions, Generator, createXOAuth2Generator} from "xoauth2";
import {SendMailOptions} from "nodemailer";

export class EmailService {
    
    private transporter: nodemailer.Transporter;
    private generator: Generator;

    constructor(generatorOptions: XOAuth2GeneratorOptions, service?){
        service = service || 'gmail';
        
        this.generator = createXOAuth2Generator(generatorOptions);

        this.transporter = nodemailer.createTransport(({
            service: service,
            auth: {
                xoauth2: this.generator
            }
        }));
    }
    
    send(sendmailOptions: SendMailOptions){
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(sendmailOptions, (error) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                } else {
                    console.log(`Message to ${sendmailOptions.to} sent`);
                    return resolve();
                }
            });
        });
    }
}