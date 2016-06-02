import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
/**
 * Created by Galyna on 13.04.2016.
 */

export class CoursesController {

    static $inject = ['$scope', '$location', 'pgCalendarData', CourseResourceName, '$mdMedia'];
    static componentName = 'CoursesController';
    courses:ICourse[];
    tooltips = true;
    calendarDirection = 'horizontal';

    constructor($scope, private $location, private pgCalendarData:IPgCalendarDataService,
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
        this.courses = this.CourseResource.query();
        this.courses.$promise.then((courses) => {
            angular.forEach(courses, (course) => {
                angular.forEach(course.courseModulesDates, (courseDate) => {
                    var cDate = new Date(courseDate);
                    let content =
                        `<div>
                        <img src="${course.hearFormsPhotos[0].url}"/>
                        <span>${course.name}</span>
                    </div>`;
                    this.pgCalendarData.setDayContent(cDate, content);
                });
            });
        });
    }

    showDetails(id:string) {
        this.$location.url('/course/' + id);
    }
}



