import {AuthServiceName, AuthService} from "./auth.service";
import {IUser} from "../../resources/user.resource";

export class ItService{

    static $inject = ["$q", AuthServiceName];

    constructor(private $q:ng.IQService, private auth: AuthService){}

    is(role){
        return this.can(role);
    }
    
    can(action){
        let user = this.auth.getUserInfo();
        let actionFn = this[action];
        if(!user) return false;
        if(!angular.isFunction(actionFn)) return false;

        return actionFn.call(this, user);
    }
    
    isAsync(role){
        return this.is(role) ? this.$q.resolve() : this.$q.reject({code: 401});
    }

    canAsync(action){
        return this.can(action) ? this.$q.resolve() : this.$q.reject({code: 401});
    }
    
    private admin(user: IUser){
        return user.roles.indexOf('admin') > -1;
    }

    private academyUser(user){
        let acceptedRoles: pg.UserRoles[] = ['admin', 'academyModerator', 'academyUser'];
        return user.roles.some((role) => {
            return acceptedRoles.indexOf(role) > -1;
        });
    }

    private salonUser(user){
        let acceptedRoles: pg.UserRoles[] = ['admin', 'salonModerator', 'salonUser'];
        return user.roles.some((role) => {
            return acceptedRoles.indexOf(role) > -1;
        });
    }

    private academyModerator(user){
        let acceptedRoles: pg.UserRoles[] = ['admin', 'academyModerator'];
        return user.roles.some((role) => {
            return acceptedRoles.indexOf(role) > -1;
        });
    }

    private salonModerator(user){
        let acceptedRoles: pg.UserRoles[] = ['admin', 'salonModerator'];
        return user.roles.some((role) => {
            return acceptedRoles.indexOf(role) > -1;
        });
    }
    
    private modifyAcademy(user){
        return this.academyModerator(user);
    }

    private modifySalon(user){
        return this.salonModerator(user);
    }

    private readAcademy(user){
        return this.academyUser(user);
    }

    private readSalon(user){
        return this.salonUser(user);
    }
}
export let ItServiceName = 'it';