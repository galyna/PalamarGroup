import {IOptions} from "express-restify-mongoose";
import * as moment from 'moment'
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import settings from "../settings";
import {adminEmailService} from "../services/email.service";

//noinspection JSUnusedLocalSymbols
export let orderOptions: IOptions = {
    preUpdate: [auth, currentUser.is('academyModerator')],
    preDelete: [auth, currentUser.is('academyModerator')],
    postCreate: (req: any, res, next) => {
        // we don't wait for admin email to be send, user don't care about it
        next();
        const mailOptions = {
            to: settings.email.adminEmail,
            subject: 'новий запис на курс',
            html: createEmailHTML(req.body)
        };
        adminEmailService.send(mailOptions)
            .catch(error => console.error(error))
    }
};

function createEmailHTML(body) {
    const start = moment(body.event_dates[0]).format('YYYY-MM-DD');
    const end = moment(body.event_dates[body.event_dates.length - 1]).format('YYYY-MM-DD');
    const courseName = body.event_name ?
        `${body.event_name} ${start} - ${end}` :
        '-';
    return `<ul>
<li>тел: ${body.phone || '-'}</li>
<li>ім'я: ${body.name || '-'}</li>
<li>email: ${body.email || '-'}</li>
<li>коментар: ${body.comment || '-'}</li>
<li>курс: <a href="${settings.clientURL}/academy/course/${body.event_id}">${courseName}</a></li>
</ul>
<a href="${settings.adminURL}#!/academy/orders">Перейти до адмінки</a>`
}

export let modelOptions: IOptions = {
    preUpdate: [auth, currentUser.is('academyModerator')],
    preDelete: [auth, currentUser.is('academyModerator')],
};