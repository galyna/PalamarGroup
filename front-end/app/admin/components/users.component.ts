import {IUserResource, IUser, UserResourceName} from "../../resources/user.resource";
import {PagingServiceName, PagingService, IAdminPagingParams, IPagingHelperParams} from "../../ui/admin.paging";
import {userComponentUrl} from "./user.component";
const template = `<md-button ng-click="$ctrl.edit()"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати користувача</md-tooltip>
</md-button>
<md-toolbar md-scroll-shrink>
    <div class="md-toolbar-tools">
        <h1>Користувачі</h1>
            <span flex></span>
      <pg-admin-paging
    params="$ctrl.paging"
    on-prev="$ctrl.prev()"
    on-next="$ctrl.next()"
    ></pg-admin-paging>
    </div>
  </md-toolbar>
    <md-list>
        <md-list-item class="md-2-line" ng-repeat="user in $ctrl.users" ng-click="$ctrl.edit(user)">
            <div class="md-list-item-text" layout="column">
                <h3>{{::user.name}}</h3>
                <p>{{::user.email}} {{::user.roles.join(", ")}}</p>
            </div>
            <md-icon ng-click="$ctrl.edit(user)" class="md-secondary" md-svg-icon="content:ic_create_24px">
                <md-tooltip>Редагувати</md-tooltip>
            </md-icon>
            <md-icon ng-click="$ctrl.showDeleteDialog($event, user)" class="md-secondary"
                     md-svg-icon="action:ic_delete_24px">
                <md-tooltip>Видалити</md-tooltip>
            </md-icon>
            <md-divider></md-divider>
        </md-list-item>
    </md-list>
`;

export class UsersComponentController {

    static $inject = ["$location", "$mdDialog", "$mdToast", "$log", UserResourceName, PagingServiceName];

    users: IUser[];
    paging: IPagingHelperParams;

    constructor(private $location:ng.ILocationService, private $mdDialog:ng.material.IDialogService,
                private $mdToast:ng.material.IToastService, private $log:ng.ILogService,
                private UserResource: IUserResource, private pagingService: PagingService){}

    $onInit(){
        this.showPage()
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.users = this.UserResource.query({page: page, perPage:10},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders(headers);
                this.pagingService.update({page: page, perPage: perPage, total: total});
                this.paging = angular.copy(this.pagingService.params());
            });
    }


    edit(user = new this.UserResource()) {
        let id = user._id || "";
        let url = userComponentUrl.replace(':id', id);
        this.$location.url(url);
    }

    showDeleteDialog(ev, user:IUser) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити користувача ${user.name}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => this.deleteUser(user));
    }

    deleteUser(user:IUser) {
        return user.$delete()
            .then((user) => this.$mdToast.showSimple(`курс ${user.name} видалено`))
            .catch((err) => {
                this.$log.error(err);
                this.showErrorToast()
            })
            .finally(()=>this.showPage(this.paging.page));
    }

    showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

}

export let usersComponentUrl = "/users";
export let usersComponentName = 'pgUsers';
export let usersComponentOptions = {
    template: template,
    controller: UsersComponentController
};