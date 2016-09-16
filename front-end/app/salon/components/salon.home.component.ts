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
        <div layout="row" flex >
            <div class="page-delimiter content-block" id="trigger-right" flex>
                <div class="fit-screen-wrap header-long " layout="column">
                    <div flex="none" layout="row" class="md-padding program-block  " layout-align=" center center">
                        <div ng-repeat="day in ::vm.course.days track by $index">
                            <div class="date-block md-margin " data-aos="fade-up" layout="column"
                                 layout-align=" center center">
                                <div class=" md-display-2">{{ day.date| date:'dd.MM'}}</div>
                                <div class="md-subhead  ">{{day.program}}</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div  class="overlay-days"> <figure ></figure></div>
                <!--<md-button hide show-gt-xs="true" class=" md-fab  side-up-btn"-->
                <!--data-aos="fade-left" data-aos-easing="ease-in-out-back"-->
                <!--data-aos-anchor="#trigger-right"-->
                <!--data-aos-anchor-placement="top-center" data-aos-delay="100" scroll-to="mainContent"-->
                <!--easing="easeInOutCubic"-->
                <!--duration="1800" aria-label="up">-->
                <!--<md-icon class=""-->
                <!--md-svg-src="navigation:ic_arrow_downward_24px"></md-icon>-->
                <!--</md-button>-->
            </div>
        </div>

        <div  layout="row" flex ng-if="vm.course.hearFormsPhotos.length>0">
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-2"> Mатеріали блоку</div>
                </div>

            </div>
        </div>

        <div layout="row" layout-align="center center" ng-if="vm.course.hearFormsPhotos.length>0">

            <div  flex flex-gt-md="60" flex-md="80">
                <div class="courses-hear-forms" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="course in vm.course.hearFormsPhotos"
                             class="md-margin " flex-gt-md="22" flex-md="22" flex-gt-xs="46" flex-xs="80"
                             ng-click="::vm.showMediaObserver(vm.course.hearFormsPhotos, $index)">
                        <card-image-container>
                            <img ng-src="{{::course.url}}" class="md-card-image">
                        </card-image-container>
                        <md-card-content ng-if="course.name" layout="column" flex="100" layout-align="center center">
                            <span class="  md-margin">{{::course.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>

        </div>

        <div layout="row" layout-align="center center" ng-if="vm.course.videos.length>0">
            <div flex flex-gt-md="60" flex-md="80" >
                <div layout="column" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" class="  courses-videos" data-aos="zoom-in-up"
                             ng-repeat="video in vm.course.videos track by $index"
                             flex>
                        <div flex class="embed-responsive embed-responsive-16by9">
                            <youtube-video class="embed-responsive-item" player-vars="{showinfo: 0}"
                                           video-id="video.url"></youtube-video>
                        </div>
                        <md-card-content ng-if="video.name" layout="column" flex="100" layout-align="center center">
                            <span class="  md-margin">{{::video.name}}</span>
                        </md-card-content>
                    </md-card>
                </div>
            </div>

        </div>

        <div layout="row" flex ng-if="vm.course.description">
            <div class="page-delimiter content-block" flex>
                <div  class="fit-screen-wrap header-long " layout="column">

                    <div layout="row" layout-align="center center">
                        <div data-aos="flip-right"   hide-xs="true" flex="60" flex-gt-sm="50"
                             class="md-display-1 md-margin md-padding">
                            {{vm.course.description}}
                        </div>
                        <div data-aos="flip-right"  hide-gt-xs="true"  flex="70"
                             class="md-headline ">{{vm.course.description}}
                        </div>

                    </div>
                </div>
                <div class="overlay-description"></div>
            </div>
        </div>

        <!--historyPhotos-->
        <div layout="row" flex ng-if="vm.course.historyPhotos.length>0">
            <div class="page-delimiter" flex>
                <div class="fit-screen-wrap invers header">
                    <div class="md-display-1">Як проходили попередні блоки</div>
                </div>

            </div>
        </div>
        <div layout="row" layout-align="center center" ng-if="vm.course.historyPhotos.length>0">
            <div  flex-gt-md="60" flex-md="90">

                <div class="courses-history" layout-margin layout layout-wrap layout-align="center center">
                    <md-card md-whiteframe="6" data-aos="zoom-in-up" ng-repeat="course in vm.course.historyPhotos"
                             class="md-margin " flex-gt-xs="46" flex-xs="80"
                             ng-click="::vm.showMediaObserver(vm.course.historyPhotos, $index)">
                        <card-image-container>
                            <img ng-src="{{::course.url}}" class="md-card-image">
                        </card-image-container>
                        <md-card-content ng-if="course.name" layout="column" flex="100" layout-align="center center">
                            <span class="  md-margin">{{::course.name}}</span>
                        </md-card-content>
                    </md-card>

                </div>
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
