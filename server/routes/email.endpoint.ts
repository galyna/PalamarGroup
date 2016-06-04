import {EmailService} from "../services/email.service";
import {Router} from "express";
import {Course, ICourseModel} from "../models/course";
import IContact = pg.models.IContact;
import {Request} from "express-serve-static-core";
import ISalonClient = pg.models.ISalonClient;
import {SalonClient} from "../models/salon.client";

export let emailEndpoint = Router();
let emailService = new EmailService({
    user: 'ostapnagovitsyn@gmail.com',
    clientId: '3589981967-i1a3i6vtrfjjk9uq4j2uhochovp5dlhc.apps.googleusercontent.com',
    clientSecret: 'nml42vl2FC7RWapNg-M1iunT',
    refreshToken: '1/FkpSMSJuZnlcwSWulSuMqhFXU5zrrzwqWJBWv_2lEw8'
});

interface EmailRequest extends Request {
    course: ICourseModel,
    salonClients: ISalonClient[]
}

emailEndpoint.route('/adv/:courseId')
    .post(async (req: EmailRequest, res, next) => {
        let id = req.params.courseId;
        if(!id) return res.status(400).end();

        let course: ICourseModel, salonClients: ISalonClient[];
        try {
            course = await Course.findOne({_id: id});
        } catch(err) {
            res.status(404).end();
        }

        try{
            salonClients = await SalonClient.find({});
            if(salonClients.length === 0){
                //TODO: better error handling
                return res.status(400).end();
            }
        } catch (err) {
            return res.status(500).json(err);
        }
        req.course = course;
        req.salonClients = salonClients;
        next();
    }, (req: EmailRequest, res) => {
        let emailPromises = req.salonClients.map((contact) => {
            return new Promise(async (resolve, reject) => {
                if(!contact.email) return reject({contact: contact, message: "Contact has no email"});

                let subject = req.course.name;
                let body = 'TODO: make email template';

                try{
                    await emailService.send({
                        to: contact.email,
                        subject: subject,
                        text: body
                    });
                    resolve(contact);
                } catch (err) {
                    reject({contact: contact, message: err.message});
                }
            });
        });

        Promise.all(emailPromises)
            .catch((err) => {
                return emailPromises;
            }).then(() => {
                res.end();
            });
    });