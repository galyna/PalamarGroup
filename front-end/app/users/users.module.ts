import 'angular';
import {userRoutes} from "./users.routes";
import {loginComponentName, loginComponentOptions} from "./login.component";
import {AuthServiceName, AuthService} from "./services/auth.service";
import {usersRun} from "./users.run";
import {ItServiceName, ItService} from "./services/it.service";
import {NotAuthorizedComponentName, NotAuthorizedComponentOptions} from "./components/not.authorized.component";

export let usersModule = angular.module('users', ['ngMaterial', 'ngMessages'])
    .config(userRoutes)
    .run(usersRun)
    .service(AuthServiceName, AuthService)
    .service(ItServiceName, ItService)
    .component(NotAuthorizedComponentName, NotAuthorizedComponentOptions)
    .component(loginComponentName, loginComponentOptions);