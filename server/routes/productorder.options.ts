import {IOptions} from "express-restify-mongoose";
import {currentUser} from "../auth/current_user";
import {auth} from "../auth/auth";
import {adminEmailService} from "../services/email.service";
import settings from "../settings";

export let productorderOptions:IOptions = {
    preUpdate: [auth, currentUser.is( 'salonModerator' )],
    preDelete: [auth, currentUser.is( 'salonModerator' )],
    access: () => 'public',
    postCreate: (req: any, res, next) => {
        // we don't wait for admin email to be send, user don't care about it
        next();
        const mailOptions = {
            to: settings.email.admin.user,
            subject: 'нове замовлення продукції',
            html: createEmailHTML(req.body)
        };
        adminEmailService.send(mailOptions)
            .catch(error => console.error(error))
    }
};

function createEmailHTML(body){
    return `<ul>
<li>тел: ${body.phone || '-'}</li>
<li>ім'я: ${body.name || '-'}</li>
<li>продукт: ${body.product || '-'}</li>
<li>коментар: ${body.comment || '-'}</li>
</ul>
<a href="${settings.adminURL}#!/salon/productorders">Перейти до адмінки</a>`
}