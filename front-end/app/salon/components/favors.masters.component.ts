import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {FavorResourceName, IFavorResource} from "../../resources/favor.resource";
import {IConstants} from "../../core/core.config";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";

const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses-details description-container" layout="column">

    <div layout="row" flex>
        <div class="page-delimiter" flex>
            <div class="fit-screen-wrap invers header">
                <div class="md-display-2"> {{::$ctrl.category.name}}</div>
            </div>

        </div>
    </div>

    <div layout="row" layout-align="center center"
    ">
    <div flex flex-gt-md="60" flex-md="80" flex-gt-xs="60">
        <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
            <md-card md-whiteframe="6" ng-repeat="favor in $ctrl.favors track by $index"
                     class="md-margin "
                     ng-attr-flex-gt-sm="46"
                     flex-gt-xs="46" flex-xs="80"
                     ng-click="::$ctrl.showFavor(favor._id)">
 <img ng-src="{{::favor.photo.url}}" class="md-card-image">                                 
                    <md-card-content layout="column" class="  show-description-favor" layout-align="center center">
                        <span class="  md-margin">{{::favor.name}}</span>
                         <div class=" md-margin show-description-content">{{::favor.description}}</div>
                       
                    </md-card-content>
            </md-card>
        </div>
    </div>
</div>
</div>

<div layout="row" ng-if="$ctrl.masters.length>0" flex>
    <div class="page-delimiter" flex>
        <div class="fit-screen-wrap  header-super">
            <div flex class="md-display-2"> Майстри</div>
        </div>
        <div class="overlay-masters">
        </div>

    </div>
</div>

<div ng-if="$ctrl.masters.length>0" class="courses description-container" layout="row" layout-align="center center">

    <div layout="column" layout-align="center center">

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>
            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media "
                             flex="50"><img ng-src="{{master.photo.url}}" ng-click="::$ctrl.showMaster(master._id)"
                                            class="md-card-image clickable-element "/>
                        </div>
                        <div class="card-desc box "
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 class="corner-ribbon top-right white"
                            >
                                {{::master.rate.text}}
                            </div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 class="corner-ribbon-min top-right white"
                            >
                                {{::master.rate.text}}
                            </div>
                            <div layout="row" layout-align="center center" class="md-padding ">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">
                                    {{::master.name}}
                                </div>
                                <div hide show-sm="true"
                                ="true" flex="90" class="md-display-1">{{::master.name}}
                            </div>
                        </div>
                        <div hide show-gt-sm="true" class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in ::master.services.slice(0,12) track by $index"
                                 layout-align=" start center">

                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">
                                </div>
                                <div class="  md-title date-text capitalize">
                                    {{ ::service.favor.name}}
                                </div>
                            </div>
                        </div>

                        <md-button hide show-sm="true" class="  md-display-1 md-raised  " aria-label="Details"
                                   ng-click="::$ctrl.showMaster(master._id)">
                            Про майстра
                        </md-button>
                        <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  "
                                   aria-label="Details"
                                   ng-click="::$ctrl.showMaster(master._id)">
                            Про майстра
                        </md-button>

                        <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                                   aria-label="Details"
                                   ng-click="::$ctrl.showAppointmentDialog(master)">
                            Записатись
                        </md-button>

            </div>
            </md-card-content>
            </md-card>

        </div>

        <div hide-gt-xs="true" layout="row" layout-align="center center">
            <div class="overlay-bg trigger-right"></div>
            <md-card md-whiteframe="8">
                <md-card-content layout="column">
                    <div ng-if="master.rate && master.rate._id!=='0'" class="card-desc-top-master white"
                         flex
                         layout="column"
                         layout-align=" space-around center">
                        <md-card-title>
                            <md-card-title-text flex layout="column" layout-align=" space-around center">
                                <div class="md-headline"> {{::master.rate.text}}</div>
                            </md-card-title-text>
                        </md-card-title>
                    </div>
                    <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"><img
                            ng-src="{{master.photo.url}}" ng-if="!!master.photo.url"
                            class="md-card-image"/></div>
                    <div class="card-desc "
                         layout="column" layout-align="center center">
                        <md-card-title>
                            <md-card-title-text>
                                <div class="md-headline">{{::master.name}}</div>

                            </md-card-title-text>
                        </md-card-title>
                        <div class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in ::master.services track by $index"
                                 layout-align=" start center">

                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">
                                </div>

                            </div>
                        </div>
                        <md-button class=" md-display-1 md-raised " aria-label="Details"
                                   ng-click="::$ctrl.showMaster(master._id)">
                            Про майстра
                        </md-button>
                        <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                   ng-click="::$ctrl.showAppointmentDialog(master)">
                            Записатись
                        </md-button>
                    </div>
                </md-card-content>

            </md-card>

        </div>
    </div>
</div>
</div>   
`;


export class FavorsMastersComponentController {


    static $inject = [FavorResourceName, 'constants', "$routeParams", "$location", MasterResourceName,
        AppointmentServiceName, AppointmentResourceName, '$q'];

    favors: any;
    masters: IMaster[];
    category: any;
    markerReadySEO: string;

    constructor(private favorResource: IFavorResource, private constants: IConstants,
                private $routeParams: ng.route.IRouteParamsService, private $location: ng.ILocationService,
                private MasterResource: IMasterResource, private AppointmentService: IAppointmentService,
                private AppointmentResource: IAppointmentResource, private $q) {


    }

    $onInit() {
        this.favors = [];
        var categories = angular.copy(this.constants.favorCategories);

        if (this.$routeParams["category"]) {
            this.category = categories.filter((cat)=> {
                return cat.url == this.$routeParams["category"]
            })[0];
            this.favors = this.favorResource.query({sort: "order", query: {"category._id": this.category._id}});
            var masterPromise = this.MasterResource.query({populate: 'services.favor', sort: "order"}).$promise;
            this.setMasters(masterPromise, this.category._id);

            this.$q.all([masterPromise, this.favors.$promise]).then((tt) => {
                this.markerReadySEO = "dynamic-content";
            });
        }
    }

    setMasters(masterPromise, categoryId) {
        masterPromise.then((masters) => {
            this.masters = masters.filter((master)=> {
                master.services = master.services.filter((s)=> {
                    return s.favor.category._id == categoryId;
                });
                return master.services.length > 0;
            })
        });
    }

    showFavor(id) {
        this.$location.path(`/beauty-parlour/service/${id}`);
    }

    showMaster(id) {
        this.$location.path(`/beauty-parlour/master/${id}`);
    }


    showAppointmentDialog(master, service = null) {
        var appointment = new this.AppointmentResource();
        appointment.master = master;
        appointment.service = service;
        this.AppointmentService.onShowDialog(appointment);
    }


    getPictureFlex(index, length) {
        if (length < 3 || (length > 3 && ( length % 3 == 1 && index >= length - 4 ) || ( length % 3 == 2 && index >= length - 5 ))) {
            return 46;
        } else {
            return 22;
        }
    }

}

export let FavorsMastersComponentUrl = "/beauty-parlour/services/:category";
export let FavorsMastersComponentName = 'pgFavorsMasters';
export let FavorsMastersComponentOptions = {
    template: template,
    controller: FavorsMastersComponentController
};