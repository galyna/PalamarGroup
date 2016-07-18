import {IRootScope} from "../typings";
import AOS from "aos";

appRun.$inject = ['$rootScope'];
export function appRun($rootScope:IRootScope) {
    $rootScope.socialParams = {
        host:"",
        target:"",
        title: "",
        image: "",
        description: ""
    };

    //create a new instance
    AOS.init();

    $rootScope.$on('$routeChangeEnd', function (next, current) {
        //when the view changes sync wow
          AOS.refresh();
    });
}