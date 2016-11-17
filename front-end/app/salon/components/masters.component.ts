import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IAppointmentResource, AppointmentResourceName} from "../../resources/appointment.resource";
import {AppointmentServiceName, IAppointmentService} from "../servises/appointment.service";

const template = `<div ng-attr-id="{{ $ctrl.markerReadySEO }}" class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div layout="row" flex>
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> Майстри</div>
                </div>

            </div>
        </div>

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>

            <div hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
                             flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/>
                        </div>
                        <div class="card-desc "
                             flex="50" layout="column" layout-align="space-around center">
                            <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                                 class="corner-ribbon top-right white">
                                {{::master.rate.text}}
                            </div>
                            <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                                 class="corner-ribbon-min top-right white">
                                {{::master.rate.text}}
                            </div>
                            <div layout="row" layout-align="center center" class="md-padding ">
                                <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                                <div hide show-sm="true"
                                ="true" flex="90" class="md-display-1">{{::master.name}}
                            </div>
                        </div>
                        <div hide show-gt-sm="true" class="md-title">
                            Вибери послугу та запишись
                        </div>
                        <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                            <div layout="column"
                                 ng-repeat="service in master.services.slice(0,12) track by $index"
                                 layout-align=" start center">

                                <div class="date-block md-margin "
                                     ng-click="::$ctrl.showAppointmentDialog(master, service)"
                                     ng-style="{'background-image':'url({{::service.favor.photo.url}})'}"
                                     layout="column"
                                     layout-align=" center center">
                                </div>
                                <div class="   md-title capitalize date-text">
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
            <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                <md-card-content layout="row" layout-align="start none">
                    <div class="card-desc  box"
                         flex="50" layout="column" layout-align="space-around center">
                        <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                             class="corner-ribbon top-left white"
                        >
                            {{::master.rate.text}}
                        </div>
                        <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                             class="corner-ribbon-min top-left white"
                        >
                            {{::master.rate.text}}
                        </div>
                        <div layout="row" layout-align="center center" class="md-padding md-margin">
                            <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                            <div hide show-sm="true"
                            ="true" flex="90" class="md-display-1">{{::master.name}}
                        </div>
                    </div>

                    <div hide show-gt-sm="true" class="md-title">
                        Вибери послугу та запишись
                    </div>
                    <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                        <div layout="column"
                             ng-repeat="service in master.services.slice(0,12) track by $index"
                             layout-align=" start center">

                            <div class="date-block md-margin "
                                 ng-click="::$ctrl.showAppointmentDialog(master,service)"
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
                    <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  " aria-label="Details"
                               ng-click="::$ctrl.showMaster(master._id)">
                        Про майстра
                    </md-button>

                    <md-button hide show-sm="true" class=" near-master xs-selected md-display-1 md-raised "
                               aria-label="Details"
                               ng-click="::$ctrl.showAppointmentDialog(master)">
                        Записатись
                    </md-button>

        </div>
        <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
             flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/></div>
        </md-card-content>
        </md-card>
        <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
            <md-card-content layout="row" layout-align="start none">
                <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"
                     flex="50"><img ng-src="{{::master.photo.url}}" class="md-card-image clickable-element"/>
                </div>
                <div class="card-desc box" flex="50"
                     flex="50" layout="column" layout-align="space-around center">
                    <div ng-if="master.rate && master.rate._id!=='0'" hide show-md="true"
                         class="corner-ribbon-min top-right white"
                    >
                        {{::master.rate.text}}
                    </div>
                    <div ng-if="master.rate && master.rate._id!=='0'" hide-md="true"
                         class="corner-ribbon-min top-right white"
                    >
                        {{::master.rate.text}}
                    </div>
                    <div layout="row" layout-align="center center" class="md-padding md-margin">
                        <div hide show-gt-sm="true" flex="90" class="md-display-2 capitalize">{{::master.name}}</div>
                        <div hide show-sm="true"
                        ="true" flex="90" class="md-display-1">{{::master.name}}
                    </div>
                </div>
                <div hide show-gt-sm="true" class="md-title">
                    Вибери послугу та запишись
                </div>
                <div hide show-gt-sm="true" layout="row" class=" program-block-master  ">
                    <div layout="column"
                         ng-repeat="service in master.services.slice(0,12) track by $index"
                         layout-align=" start center">

                        <div class="date-block md-margin "
                             ng-click="::$ctrl.showAppointmentDialog(master,service)"
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
                <md-button hide show-gt-sm="true" class=" xs-selected md-display-1 md-raised  " aria-label="Details"
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
                 flex layout=" column " layout-align=" space-around center">
                <md-card-title>
                    <md-card-title-text flex layout="column" layout-align=" space-around center">
                        <div class="md-headline"> {{::master.rate.text}}</div>
                    </md-card-title-text>
                </md-card-title>
            </div>
            <div class="card-media " ng-click="::$ctrl.showMaster(master._id)"><img ng-src="{{::master.photo.url}}"
                                                                                    class="md-card-image"/></div>
            <div class="card-desc "
                 layout="column" layout-align="center center">
                <md-card-title>
                    <md-card-title-text>
                        <div class="md-display-1 capitalize">{{::master.name}}</div>

                    </md-card-title-text>
                </md-card-title>
                <div class="md-title">
                    Вибери послугу та запишись
                </div>
                <div layout="row" class=" program-block-master  ">
                    <div layout="column"
                         ng-repeat="service in master.services track by $index"
                         layout-align=" start center">

                        <div class="date-block md-margin "
                             ng-click="::$ctrl.showAppointmentDialog(master,service)"
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


export class MastersComponentController {

    static $inject = ["$location", MasterResourceName, AppointmentServiceName, AppointmentResourceName];
    masters: IMaster[];
    markerReadySEO: string;

    constructor(private $location: ng.ILocationService,
                private masterResource: IMasterResource,private AppointmentService: IAppointmentService,
                private AppointmentResource: IAppointmentResource) {

    }

    $onInit() {
        this.masters = this.masterResource.query({sort: {"isTop": 1, "order": 1}, populate: 'services.favor'})
        this.masters.$promise.then((result) => {
            this.markerReadySEO = "dynamic-content";
        });
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

}

export let MastersComponentUrl = "/beauty-parlour/masters";
export let MastersComponentName = 'pgMasters';
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};