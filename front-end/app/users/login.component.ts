import {AuthServiceName, AuthService} from "./services/auth.service";
const template = `
<md-card>
<md-card-title>
          <md-card-title-text>
            <span class="md-headline">Логін</span>
          </md-card-title-text>
        </md-card-title>
<md-card-content>
<form novalidate ng-submit="$ctrl.login(LoginForm)" name="LoginForm">
<md-input-container class="md-block">
<label>Email</label>
<input type="text" required ng-model="$ctrl.user.email">
</md-input-container>
<md-input-container class="md-block">
<label>Пароль</label>
<input type="password" required ng-model="$ctrl.user.password">
</md-input-container>
<p ng-show="$ctrl.serverError" ng-bind="$ctrl.serverError"></p>
<md-button type="submit" class="md-raised">Логін</md-button>
</form>
</md-card-content>
</md-card>`;

export class LoginComponentController {

    static $inject = ["$location", AuthServiceName];

    user:{email:string, password: string};
    serverError: string;

    constructor(private $location: ng.ILocationService, private authService: AuthService) {

    }

    login(form: ng.IFormController){
        if(form.$invalid) return;

        this.authService.login(this.user).then(()=>{
            
            this.$location.path("/");
        }).catch((res) => {
            this.serverError = res.data.message;
        });
    }
}

export let loginComponentUrl = "/login";
export let loginComponentName = 'pgLogin';
export let loginComponentOptions = {
    template: template,
    controller: LoginComponentController
};