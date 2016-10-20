import {MasterResourceName, IMasterResource, IMaster} from "../../resources/master.resource";
import {IRootScope} from "../../../typings";
import {IAppointmentResource, AppointmentResourceName, IAppointment} from "../../resources/appointment.resource";
import {FavorResourceName} from "../../resources/favor.resource";
const template = `<div class="courses description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div layout="row" ng-if="$ctrl.masters.length>0" flex>
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> Майстри</div>
                </div>

            </div>
        </div>

        <div class="course-bg " ng-repeat="master in $ctrl.masters track by $index" layout-align="center center" flex>

            <div  hide show-gt-xs="true" layout="row" layout-align="center center">

                <md-card ng-if="$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5"
                >
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"   ng-click="$ctrl.showMaster(master._id)"
                             flex="50"><img src="{{::master.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex="50" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-md="true" class="md-display-2">{{::master.name}}</div>
                                    <div hide-md="true" class="md-display-1">{{::master.name}}</div>
                                    <div>
                                        <md-button class="  md-display-1 md-raised  " aria-label="Details"
                                                   ng-click="$ctrl.showMaster(master._id)">
                                            Про майстра
                                        </md-button>

                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class=" near-master xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(master)">
                                    Записатись
                                </md-button>
                            </md-card-actions>
                        </div>
                    </md-card-content>
                </md-card>
                <md-card id="trigger-right" ng-if="$odd " flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-desc  " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"
                             flex layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2">{{::master.name}}</div>
                                    <div hide-gt-sm="true" class="md-display-1">{{::master.name}}</div>
                                    <div>
                                        <md-button class="  md-display-1 md-raised  " aria-label="Details"
                                                   ng-click="$ctrl.showMaster(master._id)">
                                            Про майстра
                                        </md-button>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(master)">
                                    Записатись
                                </md-button>
                            </md-card-actions>
                        </div>
                        <div class="card-media " data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"   ng-click="$ctrl.showMaster(master._id)"
                             flex="50"><img src="{{::master.photo.url}}" class="md-card-image"/></div>
                    </md-card-content>
                </md-card>
                <md-card ng-if="!$first && !$odd" flex-md="90" flex-sm="70" flex="100" md-whiteframe="5">
                    <md-card-content layout="row" layout-align="start none">
                        <div class="card-media " data-aos="{{{true:'fade-right', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic"   ng-click="$ctrl.showMaster(master._id)"
                             flex="50"><img src="{{::master.photo.url}}" class="md-card-image "/>
                        </div>
                        <div class="card-desc " flex="50"
                             data-aos="{{{true:'fade-left', false:'false'}[vm.showAnimation]}}"
                             data-aos-easing="ease-out-cubic" layout="column" layout-align="center center">
                            <md-card-title flex>
                                <md-card-title-text flex layout-align="space-around center">
                                    <div hide show-gt-sm="true" class="md-display-2">{{::master.name}}</div>
                                    <div hide-gt-sm="true" class="md-display-1">{{::master.name}}</div>
                                    <div>
                                        <md-button class="  md-display-1 md-raised  " aria-label="Details"
                                                   ng-click="$ctrl.showMaster(master._id)">
                                            Про майстра
                                        </md-button>
                                    </div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-card-actions flex="25">
                                <md-button class="xs-selected md-display-1 md-raised " aria-label="Details"
                                           ng-click="$ctrl.showAppointmentDialog(master)">
                                    Записатись
                                </md-button>
                            </md-card-actions>
                        </div>

                    </md-card-content>
                </md-card>
            </div>
           
            
            <div hide-gt-xs="true" layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" >
                    <md-card-content layout="column">
                        <div class="card-media "   ng-click="$ctrl.showMaster(master._id)" ><img src="{{::master.photo.url}}" class="md-card-image"/></div>
                        <div class="card-desc "
                             layout="column" layout-align="center center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-headline">{{::master.name}}</div>
                                    <div class="md-title">{{::master.description}}</div>
                                </md-card-title-text>
                            </md-card-title>
                            <md-button class=" md-display-1 md-raised " aria-label="Details"
                                       ng-click="$ctrl.showMaster(master._id)">
                                Про майстра
                            </md-button>
                            <md-button class="xs-selected md-display-1 md-raised  " aria-label="Details"
                                       ng-click="$ctrl.showAppointmentDialog(product)">
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

    static $inject = ["$location", MasterResourceName];
    masters:IMaster[];
    constructor( private $location:ng.ILocationService,
                 private masterResource:IMasterResource) {

    }
    $onInit() {

        this.masters=  this.masterResource.query({sort:"order"})
               
        
    }

    showMaster(id) {
        this.$location.path( `/master/${id}` );
    }

}

export let MastersComponentUrl = "/masters";
export let MastersComponentName = 'pgMasters';
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};