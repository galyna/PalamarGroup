import {ContactResourceName, IContactResource, IContact} from "../../resources/contact.resource";

const template = `<div class="courses-details description-container" layout="column">

    <!--author-->
    <div layout="row" class="top-info" flex layout-align="center center">
        <md-card ng-repeat="contact in $ctrl.contacts" flex-md="90" flex-gt-md="60" flex-xs="none" flex
                 md-whiteframe="5">
            <md-card-content layuot="column" layout-gt-sm="row">
                <div class="card-desc-top " flex hide-gt-sm="true" layout="column" layout-align=" space-around center">
                    <md-card-title>
                        <md-card-title-text flex layout="column" layout-align=" space-around center">
                            <div class="md-display-1">ТЕЛЕФОН</div>
                            <div class="md-display-1">{{contact.phone}}</div>
                        </md-card-title-text>
                    </md-card-title>
                </div>
                <div class=" card-media" layout="column" data-aos="{{{true:'fade-left', false:''}[vm.showAnimation]}}"
                     data-aos-easing="ease-out-cubic"
                     flex-gt-sm="50" layout-align="center center">
                    <img src="{{contact.photo.url}}"/>
                    <div class="md-padding author-name" layout="column" layout-align="space-around center">
                        <div class="md-headline">Адміністратор акадеії</div>
                        <div class="md-headline">{{ contact.name}}</div>
                    </div>
                </div>
                <div class="card-desc " data-aos="{{{true:'fade-right', false:''}[vm.showAnimation]}}"
                     data-aos-easing="ease-out-cubic" flex-gt-sm="50"
                     layout="column" layout-align=" space-between center">
                    <md-card-title layout="column" layout-align="space-around center">
                        <md-card-title-text hide show-gt-sm="true" flex layout="column"
                                            layout-align=" space-around center">
                           <div class="md-display-1">ТЕЛЕФОН</div>
                            <div class="md-display-1">{{contact.phone}}</div>
                        </md-card-title-text>
                        <div flex class="md-title " flex layout="row" layout-align=" space-around center">
                          <div flex>{{contact.email}} </div>
                        </div>
                    </md-card-title>

                    <div flex layuot="column" layout-align="space-between stretch">

                      
                        <div class="md-padding md-margin" layout="column" layout-gt-sm="row"
                             layout-align="center center">
                            <div flex class="md-title md-padding">Адреса</div>
                            <div class=" md-headline social-image-container" layout="row"
                                 layout-align="center center">

                                <div flex>{{contact.address}} .</div>
                            </div>
                        </div>
                    </div>
                </div>
            </md-card-content>
        </md-card>
    </div>
</div>`;

export class AcademyContactComponentController {

    static $inject = ["$filter", ContactResourceName];
    contacts:IContact[];

    constructor(private $filter:ng.IFilterService, private contactResource:IContactResource) {
        var contacts = this.contactResource.query()
        contacts.$promise.then( (contacts) => {
                this.contacts = contacts.filter( (contact)=> {
                    return contact.isAcademy;
                } )
            }
        );
    }
}
export let AcademyContactComponentUrl = "/academycontact";
export let AcademyContactComponentName = 'pgAcademyContact';
export let AcademyContactComponentOptions = {
    template: template,
    controller: AcademyContactComponentController
};