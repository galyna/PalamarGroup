import {AuthServiceName, AuthService} from "./services/auth.service";
import {loginComponentUrl} from "./login.component";
import {ItServiceName, ItService} from "./services/it.service";
import {NotAuthorizedComponentUrl} from "./components/not.authorized.component";
usersRun.$inject = ["$rootScope", "$location", AuthServiceName,ItServiceName];
export function usersRun($rootScope, $location: ng.ILocationService, authService: AuthService, it: ItService){

    if(authService.isLoggedIn()){
        authService.setUserInfo();
    }else{
        $location.path(loginComponentUrl);
    }

    $rootScope.it = it;
    
    $rootScope.$on('$routeChangeError', (event, current, prev, rejection) => {
        if(rejection && rejection.code == '401') {
            $location.path(NotAuthorizedComponentUrl);
        } else {
            //TODO: error page or something
        }
    });

    $rootScope.login = () => {
        $location.path(loginComponentUrl);
    };

    $rootScope.logout = () => {
        authService.logout();
        $location.path(loginComponentUrl);
    };
}