import {AuthServiceName, AuthService} from "../users/services/auth.service";
adminRun.$inject = ["$location", AuthServiceName];
export function adminRun($location: ng.ILocationService, authService: AuthService){
    if(!authService.isLoggedIn()){
        return $location.path("/login");
    }
}