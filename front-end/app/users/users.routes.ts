import {loginComponentUrl} from "./login.component";
import {NotAuthorizedComponentUrl} from "./components/not.authorized.component";
userRoutes.$inject = ['$routeProvider'];
export function userRoutes($routeProvider: ng.route.IRouteProvider) {
    $routeProvider
        .when(loginComponentUrl, {template:`<pg-login flex layout layout-align="center center"></pg-login>`})
        .when(NotAuthorizedComponentUrl, {template:`<pg-not-authorized flex layout layout-align="center center"></pg-not-authorized>`});
}