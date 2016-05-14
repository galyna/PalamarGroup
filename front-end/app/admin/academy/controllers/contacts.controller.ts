/**
 * Created by Galyna on 14.05.2016.
 */
import {IContactService} from "../services/contact.service";
import IContact = pg.models.IContact;

export class AcademyContactsController {

    static $inject = ['contactService', '$location'];
    static componentName = 'AcademyContactsController';

    editModel:IContact;
    contact:IContact;

    constructor(private contactService:IContactService, private $location:ng.ILocationService) {
        // this.contactService.get().then((contacts) => {
        //     this.contact = contacts.find(function (item) {
        //         item.isAcademy==true;
        //     })[0];
        //     this.editModel=this.contact;
        // })
    }



}
