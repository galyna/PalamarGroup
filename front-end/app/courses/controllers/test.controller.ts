import ICourse = pg.models.ICourse;
import {ICourseService} from "../../services/course.service";
export class TestController {

    static $inject = ['$scope', 'courseService', 'pgCalendarData', '$sce', '$rootScope', '$compile'];
    static componentName = 'TestController';

    courses:ICourse[];

    constructor($scope, courseService:ICourseService, private pgCalendarData, $sce,
                $rootScope:ng.IRootScopeService, $compile:ng.ICompileService) {

        courseService.get().then((courses) => {
            courses.forEach((course)=> {
                var $scope: any = $rootScope.$new(true);
                $scope.course = course;
                course.courseModulesDates.forEach((dateString)=> {
                    $scope.date = new Date(dateString);
                    var template = `<div><span>{{date}}</span><md-tooltip>{{course.name}}</md-tooltip></div>`;
                    var el = $compile(template)($scope);
                    this.pgCalendarData.setDayContent($scope.date, $sce.trustAsHtml(el));
                });
            });
        }).catch((err)=> {
            console.log(err);
        });

        // this.items = [
        //     {url: '/api/photo/test_width.jpeg'},
        //     {url: '/api/photo/test_height.jpeg'},
        //     {url: '/api/photo/test_small.jpeg'},
        //     {url: '/api/photo/test_big.jpeg'}
        // ];
        //
        // mObserver.observe(vm.items);
    }
}