/**
 * Created by Galyna on 13.04.2016.
 */

export class CoursesController {

    static $inject = ['$scope', '$location', 'courseService'];
    static componentName = 'CoursesController';
    courses:[pg.models.ICourse];

    constructor($scope, private $location, private courseService) {
        $scope.$on("$destroy", () => {
            this.courses = null;
            this.showDetails = null;
        });

        //init page data
        this.getCourses();
    }

    getCourses() {
        this.courseService.get().then((data) => {
            this.courses = data;
            // this.courses.forEach((item) => {
            //     item.courseModulesDates = item.courseModulesDates.map((date) => {
            //         return new Date(date);
            //     });
            // });
        });
    }
    
    showDetails(id:string) {
        this.$location.url('/course/' + id);
    }
}



