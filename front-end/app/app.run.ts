import {IRootScope} from "../typings";
appRun.$inject = ['$rootScope'];
export function appRun($rootScope:IRootScope) {
    $rootScope.socialParams = {
        host:"",
        target:"",
        title: "",
        image: "",
        description: ""
    };
}