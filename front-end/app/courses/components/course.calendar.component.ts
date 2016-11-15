import {CourseResourceName, ICourseResource} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import ICourse = pg.models.ICourse;
import {IRootScope} from "../../../typings";


const template = `<div layout="row" flex layout-align="center stretch"> <pg-calendar 
                             calendar-direction="$ctrl.calendarDirection"
                             on-prev-month="prevMonth"
                             on-next-month="nextMonth"
                             on-day-click="$ctrl.dayClick(date)"
                             title-format="'MMMM y'"
                             ng-model='selectedDate'
                             day-format="'d'"
                             day-label-format="'EEE'"
                             day-label-tooltip-format="'EEEE'"
                             day-tooltip-format="'fullDate'"
                             week-starts-on="firstDayOfWeek"
                             day-content="setDayContent"
                             template-url="'app/calendar/calendar.html'"></pg-calendar> </div>`;


export interface ICourseDates {
    date:Date;
    coursesId:any;
}


export class CalendarComponentController {

    static $inject = ['pgCalendarData','$rootScope', CourseResourceName, '$sce', '$location', 'orderByFilter', 'smoothScroll'];

    courses:ICourse[];
    calendarDirection = 'horizontal';
    coursesDateMap:ICourseDates[];

    constructor(private pgCalendarData:IPgCalendarDataService,private $rootScope:IRootScope,
                private CourseResource:ICourseResource, private $sce,
                private $location, private orderByFilter:ng.IFilterOrderBy, private smoothScroll) {

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

                this.courses = this.orderByFilter( courses, "order" );
                angular.forEach( courses, (course) => {
                    if (course.isVisible) {
                        this.createDatesMap( course );
                        this.setCalendarContent( course );
                    }
                } );

                this.scrollToMain();
            }
        );
    }


    scrollToMain() {
        var options = {
            duration: 700,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById( 'mainContent' );
        this.smoothScroll( element, options );
    }

    setCalendarContent(course:ICourse) {
        angular.forEach( course.days, (courseDate) => {
            let content = this.setCoursesCalendarTemplate( course.avatar, course.name );
            this.pgCalendarData.setDayContent(   new Date(courseDate.date), this.$sce.trustAsHtml( content ) );
        } );
    }


    createDatesMap(course:ICourse) {
        //TODO: change coursesDateMap.date to Date[] like in CourseResourse
        let coursesDateChunk = course.days.map( (courseDate) => {
            return {coursesId: course._id, date:  new Date(courseDate.date)}
        } );
        this.coursesDateMap = this.coursesDateMap.concat( coursesDateChunk );
    }

    dayClick(date:Date) {
        angular.forEach( this.coursesDateMap, (course) => {
            var cDate =  course.date ;
            if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
                this.$location.url( '/academy/course/' + course.coursesId );
                return;
            }

        } );

    }
}

export let CourseCalendarComponentUrl = "/academy/calendar";
export let CourseCalendarComponentName = 'pgCourseCalendar';
export let CourseCalendarComponentOptions = {
    template: template,
    controller: CalendarComponentController
};