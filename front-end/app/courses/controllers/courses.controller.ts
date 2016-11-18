import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import {IRootScope} from "../../../typings";
/**
 * Created by Galyna on 13.04.2016.
 */

export interface ICourseDates {
    date: string;
    coursesId: any;
}

export class CoursesController {

    static $inject = ['$scope', '$sce', '$location', '$rootScope',
        'pgCalendarData', CourseResourceName, '$mdMedia', 'orderByFilter', 'smoothScroll'];
    static componentName = 'CoursesController';
    courses: ICourse[];
    calendarDirection = 'horizontal';
    showAnimation: boolean;
    markerReadySEO: string;


    constructor($scope, private $sce, private $location, private $rootScope: IRootScope,
                private pgCalendarData: IPgCalendarDataService,
                private CourseResource: ICourseResource, private $mdMedia,
                private orderByFilter: ng.IFilterOrderBy, private smoothScroll) {

        this.showAnimation = $rootScope.isBigSize;

        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        })

        this.getCourses();
    }

    getCourses() {
        this.courses = this.CourseResource.query({sort: "order"});
        this.courses.$promise.then((courses) => {
            this.scrollToMain();
            this.markerReadySEO = "dynamic-content";
        });
    }

    scrollToMain() {
        var options = {
            duration: 100,
            easing: 'easeInQuad',
            offset: 0,

        }
        var element = document.getElementById('mainContent');
        this.smoothScroll(element, options);
    }

    showDetails(id: string) {
        this.$rootScope.loading = true;
        this.$location.url('/academy/course/' + id);
    }
}



