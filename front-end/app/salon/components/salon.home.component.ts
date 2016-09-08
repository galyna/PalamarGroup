import IUploadPromise = angular.angularFileUpload.IUploadPromise;
import {IConstants} from "../../core/core.config";

import {ICourseResource, CourseResourceName, ICourse} from "../../resources/course.resource";
import {IModelResource, IModel, ModelResourceName} from "../../resources/model.resource";
import {IOrder, IOrderResource, OrderResourceName} from "../../resources/order.resource";

import {IMediaObserverFactory, MediaObserverFactoryName} from "../../ui/mediaObserver.service";
import {IRootScope} from "../../../typings";

const template = `<div class="home-services description-container" layout="row" layout-align="center center">
    <div layout="column" layout-align="center center">

        <div class="course-bg " layout-align="center center" flex
        >
            <div layout="row" layout-align="center center">
                <div class="overlay-bg trigger-right"></div>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="/content/images/services/product-1.jpg"
                                                      class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">ПЕРУКАРСЬКІ ПОСЛУГИ</div>
                                </md-card-title-text>
                            </md-card-title>
                           
                        </div>
                    </md-card-content>

                </md-card>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(course._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="/content/images/services/product-2.jpg"
                                                      class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">НІГТЬОВА ЕСТЕТИКА</div>
                                </md-card-title-text>
                            </md-card-title>
                            
                            
                        </div>
                    </md-card-content>

                </md-card>
                <md-card md-whiteframe="8" ng-click="vm.showDetails(courses[0]._id)">
                    <md-card-content layout="column">
                        <div class="card-media "><img src="/content/images/services/product-5.jpg"
                                                      class="md-card-image"/></div>
                        <div class="card-desc " data-aos="fade-up" data-aos-once="true" data-aos-easing="ease-out-cubic"
                             layout="column" layout-align="space-around center">
                            <md-card-title>
                                <md-card-title-text>
                                    <div class="md-display-1">МАКІЯЖ</div>
                                </md-card-title-text>
                            </md-card-title>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</div>


`;

export class SalonHomeComponentController {

    static $inject = [ CourseResourceName, 'orderByFilter','smoothScroll'];


    courses:ICourse[];



    constructor( private CourseResource:ICourseResource,private smoothScroll
              ) {

        this.courses = this.CourseResource.query();
        this.courses.$promise.then( (courses) => {
               var y="";
            }
        );
    }
    scrollToMain() {
    var options = {
        duration: 400,
        easing: 'easeInQuad',
        offset: 0,

    }
    var element = document.getElementById('mainContent');
    this.smoothScroll(element,options);
}



}

export let SalonHomeComponentUrl = "/home";
export let SalonHomeComponentName = 'pgSalonHome';
export let SalonHomeComponentOptions = {
    template: template,
    controller: SalonHomeComponentController
};
