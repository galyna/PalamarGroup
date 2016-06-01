import {CourseResourceName, ICourseResource, ICourse} from "../../resources/course.resource";
/**
 * Created by Galyna on 13.04.2016.
 */

export class CoursesController {

    static $inject = ['$scope', '$location', CourseResourceName];
    static componentName = 'CoursesController';
    courses: ICourse[];

    constructor($scope, private $location, private CourseResource: ICourseResource) {
        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        });

        //init page data
        this.getCourses();
    }

    getCourses() {
        this.courses = this.CourseResource.query();
    }
    
    showDetails(id:string) {
        this.$location.url('/course/' + id);
    }
}



