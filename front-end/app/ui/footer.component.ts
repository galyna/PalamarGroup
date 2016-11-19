import {IContactResource, ContactResourceName, IContact} from "../resources/contact.resource";
import {IConstants} from "../core/core.config";
import {IRootScope} from "../../typings";
import {ISalonResource, SalonResourceName, ISalon} from "../resources/salon.resource";
const template = `<div class="page-footer " ng-if="::!$root.isAdminZone()" class="md-whiteframe-z4" flex>

    <div class="fit-screen-wrap">
        <div class="page-header-wrap" layout="column" layout-align="center center">
            <div layout="row" flex layout-align="start center">
                <div layout="column" flex>
                <div   class="md-subhead social-header city">Львів
                            
                        </div>
                    <div layout="column" ng-repeat="salon in $ctrl.salons track by $index">
                     
                        <div ng-if="salon._id!='isAcademy' && salon.contacts.length>0" ng-click=" $ctrl.showContacts()"
                             class="md-subhead social-header md-padding">Адреса салону
                            {{::salon.address}}
                        </div>
                        <div ng-if="::salon._id=='isAcademy'" class="md-subhead social-header md-padding" ng-click="$ctrl.showAcademyContacts()">Академія</div>
                        <div layout="column" ng-repeat="contact in salon.contacts" class="footer-contacts" flex ng-click="salon._id!='isAcademy' && $ctrl.showContacts()">
                            <div layout="row" layout-align="start center" ng-click="salon._id=='isAcademy' && $ctrl.showAcademyContacts()">
                                <img ng-src="{{::contact.photo.url}}"
                                     class="avatar md-padding"
                                     alt="{{::contact.name}}"/>
                                <div hide-xs="true"  layout="row" layout-align="start center" flex >
                                    <div class="md-subhead md-padding"> {{::contact.name}}</div>
                                    <div class="md-title md-padding "> {{::contact.phone}}</div>
                                </div>


                                <div hide-gt-xs="true" show-xs="true" layout="row" layout-align="center " flex >
                                    <div layout="column" layout-align="center ">
                                        <div class="md-subhead"> {{::contact.name}}</div>
                                        <div class="md-subhead"> {{::contact.phone}}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div layout="row" class="social-header" layout-align="center center">
                        <div class="md-subhead md-padding"> Слідкуйте за нами в</div>
                        <a href="https://www.facebook.com/hashtag/palamar_group" target="_blank">
                            <md-icon class="md-social-image"
                                     md-svg-src="../content/images/icons/social/face.svg"></md-icon>
                        </a>
                        <a href="https://www.instagram.com/palamar_group/" target="_blank">
                            <md-icon class="md-social-image"
                                     md-svg-src="../content/images/icons/social/insta.svg"></md-icon>
                        </a>

                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="overlay "></div>
    <md-button scroll-to="mainContent" easing="easeInOutCubic"
               duration="700" class=" md-fab  up-btn" aria-label="down">
        <md-icon class=""
                 md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>
    </md-button>
</div>

</div>`;

export class FooterComponentController {

    static $inject = [ContactResourceName, 'constants', '$rootScope', SalonResourceName,'$location'];

    showAnimation: boolean;
    showMap: boolean;
    contacts: IContact[];
    salons: ISalon[];
    map: any;

    constructor(private contactResource: IContactResource,
                private constants: IConstants, private $rootScope: IRootScope,
                private salonResource: ISalonResource,private $location) {

    }


    showAcademyContacts(masterId: String) {
        this.$location.path(`/academy/contacts`);
    }

    showContacts(masterId: String) {
        this.$location.path(`/beauty-parlour/contacts`);
    }

    $onInit() {
        this.showAnimation = this.$rootScope.isBigSize;
         this.map = {
             center: {latitude: 49.811210, longitude: 23.974013}, zoom: 14
         };
        this.contacts = this.contactResource.query();
        this.contacts.$promise.then((contacts) => {
            this.salons = this.salonResource.query({sort: '-isMain'});

            this.salons.$promise.then((salons) => {
                this.showMap = true;
                var academysalon = new this.salonResource();
                academysalon._id = "isAcademy";
                salons.push(academysalon);
                this.salons = salons;
                salons.forEach((salon)=> {
                    if (!salon.contacts) {
                        salon.contacts = [];
                    }
                    // if (salon.isMain) {
                    //     this.map.center.latitude = salon.latitude;
                    //     this.map.center.longitude = salon.longitude;
                    // }
                    contacts.forEach((contact)=> {
                        if (!contact.isAcademy && contact.salon === salon._id) {
                            salon.contacts.push(contact);
                        }
                        if (contact.isAcademy && "isAcademy" === salon._id) {
                            salon.contacts.push(contact);
                        }
                    })
                })

            })
        });
    }

}

export let FooterComponentUrl = "";
export let FooterComponentName = 'pgFooter';
export let FooterComponentOptions = {
    template: template,
    controller: FooterComponentController
};