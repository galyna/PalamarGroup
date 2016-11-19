import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
import {IPgCalendarDataService} from "../../calendar/calendar.data.service";
import {IRootScope} from "../../../typings";
import {SeoPageResourceName, ISeoPageResource} from "../../resources/seo.page.resource";
/**
 * Created by Galyna on 13.04.2016.
 */

export interface ICourseDates {
    date: string;
    coursesId: any;
}

export class CoursesController {

    static $inject = ['$scope', '$sce', '$location', '$rootScope',
        'pgCalendarData', CourseResourceName, '$mdMedia', 'orderByFilter', 'smoothScroll', SeoPageResourceName,"$q"];
    static componentName = 'CoursesController';
    courses: ICourse[];
    calendarDirection = 'horizontal';
    showAnimation: boolean;
    markerReadySEO: string;
    seo:any;


    constructor($scope, private $sce, private $location, private $rootScope: IRootScope,
                private pgCalendarData: IPgCalendarDataService,
                private CourseResource: ICourseResource, private $mdMedia,
                private orderByFilter: ng.IFilterOrderBy, private smoothScroll,
                private SeoPageResource:ISeoPageResource, private $q) {

        this.showAnimation = $rootScope.isBigSize;

        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        })

        this.getCourses();
    }

    getCourses() {
        this.seo = this.SeoPageResource.query({query: {"name": "academy"}}).$promise.then((seo)=> {
            if (seo.length > 0) {
                this.$rootScope.seo = seo[0];
                document.title = this.$rootScope.seo.title;
            }

        });
        this.courses = this.CourseResource.query({sort: "order"});
        this.courses.$promise.then((courses) => {
            this.scrollToMain();
        });
        this.$q.all([this.courses.$promise, this.seo.$promise]).then((result) => {
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

        this.$location.url('/academy/course/' + id);
    }
}



