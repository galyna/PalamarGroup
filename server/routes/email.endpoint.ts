import {EmailService} from "../services/email.service";
import {Router} from "express";
import {Course, ICourseModel} from "../models/course";
import IContact = pg.models.IContact;
import {Request} from "express-serve-static-core";
import ISalonClient = pg.models.ISalonClient;
import {SalonClient} from "../models/salon.client";
import {config} from '../config';
export let emailEndpoint = Router();
let emailService = new EmailService( {
    user: 'palamargroupacademyinvites@gmail.com',
    clientId: '573730920940-206mtakrqbg71umpmmvneusmtj3o1b95.apps.googleusercontent.com',
    clientSecret: 'y1WuRtN6xhrp2vyYpA3mlddm',
    refreshToken: '1/qMOzZWnPvT-ANHBQ_5osnElmHQbZOV0Hgjy_6Mc7khU'
} );

interface EmailRequest extends Request {
    course:ICourseModel,
    salonClients:ISalonClient[]
}

emailEndpoint.route( '/adv/:courseId' )
    .post( async(req:EmailRequest, res, next) => {
        let id = req.params.courseId;
        if (!id) return res.status( 400 ).end();

        let course:ICourseModel, salonClients:ISalonClient[];
        try {
            course = await Course.findOne( {_id: id} ).exec();
        } catch (err) {
            res.status( 404 ).end();
        }

        try {
            salonClients = await SalonClient.find( {} ).exec();
            if (salonClients.length === 0) {
                //TODO: better error handling
                return res.status( 400 ).end();
            }
        } catch (err) {
            return res.status( 500 ).json( err );
        }
        req.course = course;
        req.salonClients = salonClients;
        next();
    }, (req:EmailRequest, res) => {
        let emailPromises = req.salonClients.map( (contact) => {
            return new Promise( async(resolve, reject) => {
                if (!contact.email) return reject( {contact: contact, message: "Contact has no email"} );

                let subject = req.course.name;
                let template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta charset="UTF-8">
    <title>Title</title>

</head>
<body>
<div  style=" display: table;">
<a style="text-decoration: none;" href="${config.origin + '/course/' + req.course._id}">
    <div class="logo " style=" background-color: white;
            width: 1000px;height: 100px;">
        <div class="page-header-wrap " style=" text-align: center;margin: auto; 
                        display: flex;
            align-items: center;
            justify-content: center;
            color: black;width: 100%" layout="row" layout-align="center center">
            <img style="display: inline;
            width: 70px;
            min-height: 70px;
            height: 70px;
            padding: 10px;" src="${config.origin + '/content/images/logo/palamar_logo_70.png'}"/>
            <div >
                <h1 class="featured-area-title" style=" text-align: center;
            font-size: 4.9428em;
            font-weight: 900;
            line-height: 1em;
            text-transform: uppercase;
             width: 800px;
            margin: 0;"> PALAMAR GROUP</h1>
                <div style=" font-size: 2.1em;
            line-height: 1em;" class="featured-area-subtitle">
                    beauty parlour & academy
                </div>
            </div>
            <img style="display: inline-block;
            width: 70px;
            height: 70px;
            padding: 10px; min-height: 70px;" src="${config.origin + '/content/images/logo/palamar_logo_70.png'}"/>
        </div>

    </div>
    <div style=" display: flex;
            flex-direction: row;
            flex: 1 50%;flex-wrap: wrap ; color: #2b2b2b;" class=" courses">
        <img style="z-index: -100;
            width: 500px;
            height: 500px;
            display: inline-block;" src="${config.origin +  req.course.avatar}"
        >
        <div style=" background: white;
            width: 500px;
            height: 500px;
            vertical-align: middle;
            text-align: center;
            position: relative;
            display: inline-block;" class="card-desc  ">
          <div style=" padding-top: 25px;
            padding-bottom: 15px;
            font-size: 26px;
            width: 100%;
            height: 20px;color: #2b2b2b;" > Запрошуємо на </div>

            <div style=" padding-top: 5px;
            padding-bottom: 15px;
            font-size: 36px;
            font-weight: bold;
            width: 100%;
            height: 60px;color: #2b2b2b;" >${ req.course.name}</div>

            <div style="margin-left: auto;
            margin-right: auto;
            width: 16em;
            max-height: 240px;
            margin-bottom: 20px;
            font-size:  1.4em;
            color: black;
            display: inline-block;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;" >
                 ${ req.course.description}

            </div>
            <a style="    display: block;
            border-style: solid;
            border-color: black;
            border-width: 3px;
            background-color: black;
            color: white;
            position: relative;
            min-height: 56px;
            cursor: pointer;
            margin: auto;
            font-size: 40px;
            vertical-align: middle;
            width: 50%;
            font-size: 26px;
            border-radius: 0px;
            text-align: center;
            transition: background-color 0.3s;
            min-width: 200px;text-decoration: none;"  href="${config.origin + '/course/' + req.course._id}"  ng-transclude=""
                    aria-label="Details" ><div style="cursor: pointer; font-size: 40px;">
                                    Деталі
           </div></a>
        </div>
    </div>
    </a>
</div>

</body>
</html>`;

                try {
                    await emailService.send( {
                        to: contact.email,
                        subject: subject,
                        html: template
                    } );
                    resolve( contact );
                } catch (err) {
                    reject( {contact: contact, message: err.message} );
                }
            } );
        } );

        Promise.all( emailPromises )
            .catch( (err) => {
                return emailPromises;
            } ).then( () => {
            res.end();
        } );
    } );
