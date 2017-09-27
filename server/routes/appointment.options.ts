import {IOptions} from "express-restify-mongoose";
import * as momentTz from 'moment-timezone'
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {adminEmailService} from "../services/email.service";
import settings from "../settings";

export let appointmentOptions:IOptions = {
    preUpdate: [auth, currentUser.is( 'salonModerator' )],
    preDelete: [auth, currentUser.is( 'salonModerator' )],
    access: () => 'public',
    postCreate: (req: any, res, next) => {
        // we don't wait for admin email to be send, user don't care about it
        next();
        const mailOptions = {
            to: settings.email.admin.user,
            subject: 'новий запис на прийом/запитання',
            html: createEmailHTML(req.body)
        };
        adminEmailService.send(mailOptions)
            .catch(error => console.error(error))
    }
};

function createEmailHTML(body){
    const date = body.date ? momentTz(body.date).tz('Europe/Kiev').format('YYYY-MM-DD HH:mm') : '-';
    return `<ul>
<li>тел: ${body.phone || '-'}</li>
<li>ім'я: ${body.name || '-'}</li>
<li>дата: ${date}</li>
<li>коментар: ${body.comment}</li>
<li>консультація: ${body.isConsultation ? 'так' : 'ні'}</li>
<li>послуга: ${body.service && body.service.favor ? body.service.favor.name : '-'}</li>
<li>майстер: ${body.master ? body.master.name : '-'}</li>
</ul>
<a href="${settings.adminURL}#!/salon/appointments">Перейти до адмінки</a>`
}