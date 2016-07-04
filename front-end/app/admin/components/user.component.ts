
import {IUserResource, IUser, UserResourceName} from "../../resources/user.resource";
const template = `
<form name="saveUserForm" novalidate ng-submit="$ctrl.save(saveUserForm)" flex layout="column">
    <md-toolbar>
        <div class="md-toolbar-tools">
            <md-button class="md-icon-button" ng-href="#/users">
                <md-icon md-svg-src="navigation:ic_arrow_back_24px"></md-icon>
                <md-tooltip>Користувачі</md-tooltip>
            </md-button>
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" ng-disabled="saveUserForm.$pristine">
                <span>Скасувати</span>
                <md-tooltip>Скасувати зміни</md-tooltip>
            </md-button>
            <md-button type="submit" class="md-raised">Зберегти</md-button>
        </div>
    </md-toolbar>
    <md-card>
    <md-card-content>
    <md-input-container class="md-block">
                        <label>Email</label>
                        <input type="text" required ng-model="$ctrl.user.email" />
                    </md-input-container>
                        <md-input-container class="md-block">
                        <label>Ім’я</label>
                        <input type="text" required ng-model="$ctrl.user.name" />
                    </md-input-container>
                        <md-input-container class="md-block">
                        <label>Ролі</label>
                        <md-select ng-model="$ctrl.user.roles" multiple>
                            <md-option ng-value="role.id" ng-repeat="role in $ctrl.roles">{{role.name}}</md-option>
                             
</md-select>
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label>Пароль</label>
                        <input type="password" ng-required="!$ctrl.user._id" ng-model="$ctrl.user.password" />
                    </md-input-container>
                     <md-input-container class="md-block">
                        <label>Пароль</label>
                        <input type="password" ng-required="!$ctrl.user._id" ng-model="$ctrl.user.password" />
                    </md-input-container>
</md-card-content>
</md-card>
</form>
`;

export class UsersComponentController {

    static $inject = ["$routeParams", "$mdDialog", "$mdToast", "$log", UserResourceName];

    user: IUser;
    originalUser: IUser;
    roles: {id:pg.UserRole, name:string}[];

    constructor(private $routeParams:ng.route.IRouteParamsService, private $mdDialog:ng.material.IDialogService,
                private $mdToast:ng.material.IToastService, private $log:ng.ILogService,
                private UserResource: IUserResource){}

    $onInit() {
        this.roles = [
            {id:"admin", name:"Адміністратор"},
            {id:"academyModerator", name:"Модератор академії"},
            {id:"academyUser", name:"Користувач академії"},
            {id:"salonModerator", name:"Модератор салону"},
            {id:"salonUser", name:"Користувач салону"}
        ];
        if (this.$routeParams["id"]) {
            this.UserResource.get( {id: this.$routeParams["id"]} ).$promise
                .then( (user) => {
                    this.originalUser = user;
                    this.user = angular.copy( this.originalUser );
                } );
        } else {
            this.originalUser = new this.UserResource();
            this.user = angular.copy( this.originalUser );
        }
    }

    cancel() {
        this.user = angular.copy( this.originalUser );
    }

    save(form:ng.IFormController) {
        if (form.$invalid) return;
        this.user.$save()
            .then( (user) => {
                this.$mdToast.showSimple( `курс ${user.name} збережено` );
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorToast();
            } );
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple( text );
    }
}

export let userComponentUrl = "/user/:id?";
export let userComponentName = 'pgUser';
export let userComponentOptions = {
    template: template,
    controller: UsersComponentController
};