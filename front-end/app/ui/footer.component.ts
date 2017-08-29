import {IContactResource, ContactResourceName, IContact} from "../resources/contact.resource";
import {IConstants} from "../core/core.config";
import {IRootScope} from "../../typings";
import {ISalonResource, SalonResourceName, ISalon} from "../resources/salon.resource";
const template = `<script type='application/ld+json'>
    {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "PALAMAR GROUP",
    "alternateName": "Студія краси PALAMAR ",
    "url": "http://palamar.com.ua/",
    "about":"Офіційний сайт студії краси та навчильного центру для працівників салонів краси у Львові PALAMAR GROUP",
    "keywords":"стрижка львів, салон краси Львів, перукарня у Львові, навчання для перукурів, навчитись стригти, перукарське мистецтво курси",
    "sameAs": [
    "https://www.facebook.com/hashtag/palamar_group",
    "https://www.instagram.com/palamar_group/",
    "https://vk.com/id202584528"
    ]
    }
</script>

<sb-jsonld json="{{$ctrl.seoJson}}"></sb-jsonld>
<div class="page-header-wrap" layout="column" layout-align="center center">
    <div layout="row" flex layout-align="start center">
        <div layout="column" flex>
            <div iitemprop="name" class="md-subhead social-header city">Львів

            </div>
            <div layout="column" ng-repeat="salon in $ctrl.salons track by $index">

                <div
                        ng-if="salon._id!='isAcademy' && salon.contacts.length>0"
                        ng-click=" $ctrl.showContacts()"
                        class="md-subhead social-header md-padding">Адреса салону
                    {{::salon.address}}
                </div>
                <div ng-if="::salon._id=='isAcademy'" class="md-subhead social-header md-padding"
                     ng-click="$ctrl.showAcademyContacts()">Академія
                </div>
                <div layout="column" ng-repeat="contact in salon.contacts" class="footer-contacts" flex
                     ng-click="salon._id!='isAcademy' && $ctrl.showContacts()">
                    <div layout="row" layout-align="start center"
                         ng-click="salon._id=='isAcademy' && $ctrl.showAcademyContacts()">
                        <img ng-src="{{::contact.photo.url}}"
                             class="avatar md-padding"
                             alt="{{::contact.name}}"/>
                        <div hide-xs="true" layout="row" layout-align="start center" flex>
                            <div class="md-subhead md-padding"> {{::contact.name}}</div>
                            <div class="md-title md-padding "> {{::contact.phone}}</div>
                        </div>


                        <div hide-gt-xs="true" show-xs="true" layout="row" layout-align="center " flex>
                            <div layout="column" layout-align="center ">
                                <div class="md-subhead"> {{::contact.name}}</div>
                                <div itemprop="telephone" class="md-subhead"> {{::contact.phone}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div layout="row" class="social-header" layout-align="center center" style="padding-top:5px !Important;">
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
            <div layout="row" class="social-header" layout-align="center center">
                <div class="md-subhead "> Ми на карті</div>
                <a href="https://www.google.ru/maps/place/%D0%A1%D1%82%D1%83%D0%B4%D1%96%D1%8F+%D0%BA%D1%80%D0%B0%D1%81%D0%B8+%D0%AE%D0%BB%D1%96%D1%97+%D0%9F%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%80/@49.8110803,23.9715886,17z/data=!3m1!4b1!4m5!3m4!1s0x473ae70c7a4a754b:0x96d5b6a9de35eaa0!8m2!3d49.8110769!4d23.9737773"
                   target="_blank">
                    <md-icon class="md-social-image" md-svg-icon="communication:ic_location_on_24px"
                    ></md-icon>
                </a>


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


`;

export class FooterComponentController {

    static $inject = [ContactResourceName, 'constants', '$rootScope', SalonResourceName, '$location'];

    showAnimation: boolean;
    showMap: boolean;
    contacts: IContact[];
    salons: ISalon[];
    map: any;
    seoJson: any;

    constructor(private contactResource: IContactResource,
                private constants: IConstants, private $rootScope: IRootScope,
                private salonResource: ISalonResource, private $location) {
        this.initSeo();
    }

    initSeo() {
        this.seoJson = {
            "@context": "http://www.schema.org",
            "@type": "BeautySalon",
            "name": "PALAMAR GROUP",
            "currenciesAccepted": "UAH,USD,EUR",
            "paymentAccepted": "Cash, credit card",
            "url": "http://palamar.com.ua/",
            "founder": {
                "@context": "http://schema.org/",
                "@type": "Person",
                "name": "Юлія Паламар",
                "homeLocation": {
                    "@type": "Place",
                    "geo": {
                        "@type": "GeoCircle",
                        "geoMidpoint": {
                            "@type": "GeoCoordinates",
                            "latitude": "49.8110769",
                            "longitude": "23.9737773"
                        },
                        "geoRadius": "50"
                    },
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                        "addressLocality": "Львів, Україна",
                        "addressCountry": "Україна"
                    }
                }
            },
            "sameAs": [
                "https://www.facebook.com/hashtag/palamar_group",
                "https://www.instagram.com/palamar_group/",
                "https://vk.com/id202584528"
            ],
            "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
            "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_1200.jpg",
            "description": "Салон краси Львів стрижка, фарбування, мейкап, догляд за шкірою голови ",
            "serviceArea": {
                "@type": "AdministrativeArea",
                "name": "Львів"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                "addressLocality": "Львів, Україна",
                "addressCountry": "Україна"
            },
            "location": {
                "@type": "Place",
                "geo": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": "49.8110769",
                        "longitude": "23.9737773"
                    },
                    "geoRadius": "50"
                },
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "вул.Щирецька 36, ТЦ «ГАЛЕРЕЯ» ДРУГИЙ ПОВЕРХ № СТУДІЯ ",
                    "addressLocality": "Львів, Україна",
                    "addressCountry": "Україна"
                }
            },
            "telephone": "+38 067 264 6216",
            "hasMap": "https://www.google.ru/maps/place/%D0%A1%D1%82%D1%83%D0%B4%D1%96%D1%8F+%D0%BA%D1%80%D0%B0%D1%81%D0%B8+%D0%AE%D0%BB%D1%96%D1%97+%D0%9F%D0%B0%D0%BB%D0%B0%D0%BC%D0%B0%D1%80/@49.8110803,23.9715886,17z/data=!3m1!4b1!4m5!3m4!1s0x473ae70c7a4a754b:0x96d5b6a9de35eaa0!8m2!3d49.8110769!4d23.9737773",
            "openingHours": "Mo, Tu, We, Th, Fr 10:00-19:00",
            "priceRange": "від 300 грн",
            "brand": {
                "@context": "http://schema.org/",
                "@type": "Brand",
                "url": "http:/palamar.com.ua/",
                "alternateName": "PALAMAR",
                "logo": "http://palamar.com.ua/content/images/logo/palamar_logo.png",
                "image": "http://palamar.com.ua/content/images/bg/slider/IMG_6917_723.jpg",
                "description": "Салон краси у Львові. Послуги: стрижки, зачіски,фарбування, візаж, мейкап. Навчальний центр працівників салонів краси. Курси з колористики, перукарського мистецтва, , візажу",
                "name": "PALAMAR GROUP"
            }
        }
    }

    showAcademyContacts(masterId: String) {
        this.$location.path(`/academy/contacts`);
    }

    showContacts(masterId: String) {
        this.$location.path(`/beauty-salon/contacts`);
    }

    $onInit() {
        this.showAnimation = this.$rootScope.isBigSize;

        this.contacts = this.contactResource.query();
        this.contacts.$promise.then((contacts) => {
            this.salons = this.salonResource.query({sort: '-isMain'});

            this.salons.$promise.then((salons) => {

                var academysalon = new this.salonResource();
                academysalon._id = "isAcademy";
                salons.push(academysalon);
                this.salons = salons;

                salons.forEach((salon) => {
                    if (!salon.contacts) {
                        salon.contacts = [];
                    }
                    this.seoJson.contactPoint = [];
                    if (salon.isMain && salon.contacts.length > 0) {
                        this.seoJson.telephone = salon.contacts[0].phone
                    }


                    contacts.forEach((contact) => {

                        if (!contact.isAcademy && contact.salon === salon._id) {
                            salon.contacts.push(contact);
                        }
                        if (contact.isAcademy && "isAcademy" === salon._id) {
                            salon.contacts.push(contact);
                        }
                        if (contact.phone && contact.photo) {
                            this.seoJson.contactPoint.push({
                                "@type": "ContactPoint",
                                "telephone": contact.phone,
                                "contactType": "customer service",
                                "image": "http://palamar.com.ua" + contact.photo.url
                            });
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