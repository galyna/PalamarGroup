import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
/**
 * Created by Galyna on 13.04.2016.
 */

export interface ICourseDates {
    date:string;
    coursesId:any;
}

export class CoursesController {

    static $inject = ['$scope', '$sce', '$location', 'pgCalendarData', CourseResourceName, '$mdMedia'];
    static componentName = 'CoursesController';
    courses:ICourse[];
    calendarDirection = 'horizontal';
    coursesDateMap:ICourseDates[];
  

    constructor($scope, private $sce, private $location, private pgCalendarData:IPgCalendarDataService,
                private CourseResource:ICourseResource, private $mdMedia) {
        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        });
        
        //init calendar direction
        this.calendarDirection = this.$mdMedia('max-width: 600px') ? 'vertical' : 'horizontal';
        $scope.$watch(()=> {
            return this.$mdMedia('max-width: 600px');
        }, (sm)=> {
            this.calendarDirection = sm ? 'vertical' : 'horizontal';
        });

        //init page data
        this.getCourses();

    }

    getCourses() {
        this.coursesDateMap = [];
        this.courses = this.CourseResource.query();
        this.courses.$promise.then((courses) => {
            angular.forEach(courses, (course) => {
                this.createDatesMap(course);
                this.setCalendarContent(course);
            });
        });
    }

    setCalendarContent(course:ICourse) {
        angular.forEach(course.courseModulesDates, (courseDate) => {
            var cDate = new Date(courseDate);
            let content =
                ` <div class="hovereffect">
                       <img class="img-responsive" src="${course.hearFormsPhotos[0].url}" alt="">
                      <div class="overlay">
                     <h2>${course.name}</h2>
                       </div>                  
                    </div>`;

            this.pgCalendarData.setDayContent(cDate, this.$sce.trustAsHtml(content));
        });
    }


    createDatesMap(course:ICourse) {
        let coursesDateChunk = course.courseModulesDates.map((date) => {
            return {coursesId: course._id, date: date}
        });
        this.coursesDateMap = this.coursesDateMap.concat(coursesDateChunk);
    }

    dayClick(date:Date) {
        angular.forEach(this.coursesDateMap, (course) => {
            var cDate = new Date(course.date);
            if (cDate.getDate() == date.getDate() && cDate.getFullYear() == date.getFullYear() && cDate.getMonth() == date.getMonth()) {
                this.$location.url('/course/' + course.coursesId);
                return;
            }

        });

    }

    showDetails(id:string) {
        this.$location.url('/course/' + id);
    }
}



