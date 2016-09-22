import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import {IRootScope} from "../../../typings";
/**
 * Created by Galyna on 13.04.2016.
 */

export interface ICourseDates {
    date:string;
    coursesId:any;
}

export class CoursesController {

    static $inject = ['$scope', '$sce', '$location', '$rootScope',
        'pgCalendarData', CourseResourceName, '$mdMedia', 'orderByFilter'];
    static componentName = 'CoursesController';
    courses:ICourse[];
    calendarDirection = 'horizontal';
    coursesDateMap:ICourseDates[];
    showAnimation:boolean;


    constructor($scope, private $sce, private $location, private $rootScope:IRootScope, private pgCalendarData:IPgCalendarDataService,
                private CourseResource:ICourseResource, private $mdMedia, private orderByFilter:ng.IFilterOrderBy) {
        this.showAnimation = $rootScope.isBigSize;

        $scope.$on( "$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        } )

        this.getCourses();
    }

    setCoursesCalendarTemplate(picture, name) {
        if (!!('ontouchstart' in window)) {
            return ` <div class="touch-device course-marker">
                       <img  src="${picture}" alt="">
                      <div class="overlay">
                     <h2>${name}</h2>                    
                       </div>                  
                    </div>`
        } else {
            return ` <div class="hovereffect course-marker">
                       <img  src="${picture}" alt="">
                      <div class="overlay">
                     <h2>${name}</h2>
                      <button class="md-button detail-btn" aria-label="Play" >
                            Деталі
                        </button>
                       </div>                  
                    </div>`

        }
    }

    getCourses() {
        this.coursesDateMap = [];
        this.courses = this.CourseResource.query();
        this.courses.$promise.then( (courses) => {
                this.courses = this.orderByFilter( courses, "order" )
                angular.forEach( courses, (course) => {
                    if (course.isVisible) {
                        this.createDatesMap( course );
                        this.setCalendarContent( course );
                        course.hearFormsPhotos = this.orderByFilter( course.hearFormsPhotos, "order" )
                    } else {
                        this.courses.splice( this.courses.indexOf( course ), 1 );
                    }
                } );
            }
        );
    }


    // setCalendarContent(course:ICourse) {
    //     angular.forEach( course.days, (courseDate) => {
    //         let content = this.setCoursesCalendarTemplate( course.avatar, course.name );
    //         this.pgCalendarData.setDayContent( courseDate.date, this.$sce.trustAsHtml( content ) );
    //     } );
    // }
    //
    //
    // createDatesMap(course:ICourse) {
    //     let coursesDateChunk = course.days.map( (day) => {
    //         return {coursesId: course._id, date: day.date.toJSON()}
    //     } );
    //     this.coursesDateMap = this.coursesDateMap.concat( coursesDateChunk );
    // }
    //
    // dayClick(date:Date) {
    //     angular.forEach( this.coursesDateMap, (course) => {
    //         var cDate = new Date( course.date );
    //         if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
    //             this.$location.url( '/course/' + course.coursesId );
    //             return;
    //         }
    //
    //     } );
    //
    // }

    showDetails(id:string) {
        this.$location.url( '/course/' + id );
    }
}



