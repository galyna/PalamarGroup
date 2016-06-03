import ICourse = pg.models.ICourse;
import {ICourseResource, CourseResourceName} from "../../resources/course.resource";
export class TestController {

    static $inject = ['$scope', CourseResourceName, 'pgCalendarData', '$sce', '$rootScope', '$compile'];
    static componentName = 'TestController';

    courses:ICourse[];

    //noinspection JSUnusedLocalSymbols
    constructor($scope, CourseResource: ICourseResource, private pgCalendarData, $sce,
                $rootScope:ng.IRootScopeService, $compile:ng.ICompileService) {

    }
}