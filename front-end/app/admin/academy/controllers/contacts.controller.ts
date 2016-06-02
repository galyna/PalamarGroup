import {IContact, IContactResource, ContactResourceName} from "../../../resources/contact.resource";

export class AcademyContactsController {

    static $inject = [ContactResourceName, '$location'];
    static componentName = 'AcademyContactsController';

    editModel:IContact;
    contact:IContact;

    constructor(private ContactResource: IContactResource, private $location:ng.ILocationService) {
        // this.contactService.get().then((contacts) => {
        //     this.contact = contacts.find(function (item) {
        //         item.isAcademy==true;
        //     })[0];
        //     this.editModel=this.contact;
        // })
    }



}
