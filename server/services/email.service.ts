import * as xoauth2 from 'xoauth2';
import * as nodemailer from 'nodemailer';

export class EmailService {
    
    private transporter: nodemailer.Transporter;
    private generator: xoauth2.Generator;

    constructor(user: string, clientId: string, clientSecret: string, refreshToken: string, service = 'gmail'){

        this.generator = xoauth2.createXOAuth2Generator({
            user: user,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken
        });

        this.transporter = nodemailer.createTransport(({
            service: service,
            auth: {
                xoauth2: this.generator
            }
        }));
    }
    
    send(from: string, to: string, subject: string, text?: string, html?: string){
        // send mail
        this.transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html
        }, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent');
            }
        });
    }
}