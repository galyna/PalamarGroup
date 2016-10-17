import {IContactResource, ContactResourceName, IContact} from "../resources/contact.resource";
import {IConstants} from "../core/core.config";
import {IRootScope} from "../../typings";
import {ISalonResource, SalonResourceName, ISalon} from "../resources/salon.resource";
const template = `<div class="page-footer " ng-if="!$root.isAdminZone()" class="md-whiteframe-z4" flex>

    <div class="fit-screen-wrap">

        <div class="page-header-wrap" layout="column" layout-align="center center">
            <div layout="row" flex layout-align="start start" class=" md-margin">

                <div layout="column" flex>
                    <!--<div class="md-title social-header md-padding header-contacts ">Контакти</div>-->
                    <div layout="column" ng-repeat="salon in $ctrl.salons">
                        <div ng-if="salon._id!='isAcademy'" class="md-subhead social-header md-padding">Салон на {{salon.address}}</div>
                        <div ng-if="salon._id=='isAcademy'" class="md-subhead social-header md-padding">Академія</div>
                        <div layout="column" ng-repeat="contact in salon.contacts" class="footer-contacts">
                            <div layout="row" layout-align="start center">
                                <img ng-src="{{contact.photo.url}}"
                                     class="avatar md-padding"
                                     alt="{{contact.name}}"/>
                                <div  hide show-gt-xs="true" layout="row" layout-align="center center" >
                                    <div  class="md-subhead md-padding"> {{contact.name}}</div>
                                    <div  class="md-title md-padding "> {{contact.phone}}</div>
                                </div>
                                

                                <div hide-gt-xs="true" layout="row" layout-align="center " class=" md-padding">
                                    <div layout="column" layout-align="center ">
                                        <div class="md-subhead"> {{contact.name}}</div>
                                        <div class="md-subhead"> {{contact.phone}}</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div layout="column" class='md-margin'>
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
                <div class='social-container' layout="row" layout-align="center center">
                    <iframe hide show-gt-xs="true" scrolling="no" marginheight="0" frameborder="0" width="598"
                            style="height: 399px;"
                            src="http://facebookgalleria.com/gallery.php?id=StudioPalamar&display=uploaded_photos&rows=2&margin=2&cols=3&width=197&font_size=11&title_color=000000&hide_next_back=0&share_buttons=1&shape=square&frame=1&token=b155a40e-9451-11e6-b31c-30eb0f887bd0"></iframe>
                    <iframe hide-gt-xs="true" scrolling="no" marginheight="0" frameborder="0" width="295"
                            style="height: 442px;"
                            src="http://facebookgalleria.com/gallery.php?id=StudioPalamar&display=uploaded_photos&rows=3&margin=2&cols=2&width=145&font_size=11&title_color=000000&hide_next_back=0&share_buttons=1&shape=square&frame=1&token=b155a40e-9451-11e6-b31c-30eb0f887bd0"></iframe>
               
                </div>

            </div>
            <div layout="column" layout-gt-md="row" flex layout-align="center center" class="md-margin"
            >

                <ui-gmap-google-map id="map" class="footer-man"
                                    center='$ctrl.map.center' zoom='$ctrl.map.zoom' options="$ctrl.map.options">
                    <ui-gmap-marker ng-repeat="salon in $ctrl.salons"
                                    coords="{ latitude: salon.latitude, longitude: salon.longitude}" idkey="$index">

                    </ui-gmap-marker>
                    </ui-gmap-markers>
                </ui-gmap-google-map>


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

    static $inject = [ContactResourceName, 'constants', '$rootScope', SalonResourceName,];

    showAnimation:boolean;
    showMap:boolean;
    contacts:IContact[];
    salons:ISalon[];
    map:any;

    constructor(private contactResource:IContactResource,
                private constants:IConstants, private $rootScope:IRootScope,
                private salonResource:ISalonResource) {


    }

    $onInit() {
        this.showAnimation = this.$rootScope.isBigSize;
        this.map = {
            center: {latitude: 49.811210, longitude: 23.974013}, zoom: 12, options: {
                fullscreenControl: true,

            }
        };
        this.contacts = this.contactResource.query(  );
        this.contacts.$promise.then( (contacts) => {
            this.salons = this.salonResource.query();

            this.salons.$promise.then( (salons) => {
                this.showMap = true;
                var academysalon= new this.salonResource();
                academysalon._id="isAcademy";
                salons.push(academysalon);
                this.salons=salons;
                salons.forEach( (salon)=> {
                    if (!salon.contacts) {
                        salon.contacts = [];
                    }

                    contacts.forEach( (contact)=> {
                        if (!contact.isAcademy && contact.salon === salon._id) {
                            salon.contacts.push( contact );
                        }
                        if (contact.isAcademy && "isAcademy" === salon._id ) {
                            salon.contacts.push( contact );
                        }
                    } )
                } )

            } )
        } );
    }

}

export let FooterComponentUrl = "";
export let FooterComponentName = 'pgFooter';
export let FooterComponentOptions = {
    template: template,
    controller: FooterComponentController
};