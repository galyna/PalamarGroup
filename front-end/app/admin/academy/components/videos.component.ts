import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {
    AcademyVideosResourceName, IAcademyVideosResource,
    IAcademyVideos
} from "../../../resources/academy.video.resource";
const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Відео академії</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addContact()" ng-if="::$root.it.can('modifyAcademy')"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати Відео Групу</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="contact in $ctrl.contacts"  ng-click="$ctrl.editContact( contact)"
    >
 

        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::contact.name}}</p>
        </div>

  
        <md-icon ng-if="::$root.it.can('modifyAcademy')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, contact)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;


export class VideosComponentController {

    static $inject = [AcademyVideosResourceName,"$filter", "$location", "$mdDialog", "$mdToast", "$mdMedia",  PagingServiceName];
    contacts: IAcademyVideos[];
    paging: any;
    constructor(private AcademyVideosResource:IAcademyVideosResource,private $filter: ng.IFilterService, private $location: ng.ILocationService, private $mdDialog: ng.material.IDialogService, private $mdToast: ng.material.IToastService,
                private $mdMedia: ng.material.IMedia,
                private pagingService: PagingService) {

    }
    $onInit() {
        this.showPage();
    }

    addContact() {
        this.$location.path("/academy/video");
    }

    editContact(contact: IAcademyVideos) {
        this.$location.path(`/academy/video/${contact._id}`);
    }

    showDeleteDialog(ev, contact: IAcademyVideos) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити Адміністратора ${contact.name || ''}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => {
                return this.deleteFavor(contact);
            });
    }

    deleteFavor(contact: IAcademyVideos) {
        contact.$delete().then(() => {
            this.$mdToast.showSimple(`Адміністратора видалено`);
        }).catch((err)=> {
            this.showErrorDialog();
        }).finally(()=> {
            this.showPage(this.pagingService.currentPage());
        });
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.contacts = this.AcademyVideosResource.query({
                page: page,
                perPage: 9
            },
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders(headers);
                this.pagingService.update({page: page, perPage: perPage, total: total});
                this.paging = angular.copy(this.pagingService.params());
            });
    }


    showErrorToast(text = 'Помилка, спробуйте пізніше') {
    this.$mdToast.showSimple(text);
}

    //noinspection JSMethodCanBeStatic
    deleteFromList(list: any[], item: any) {
        list.splice(list.indexOf(item), 1);
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }

}

export let VideosComponentUrl = "/academy/videos";
export let VideosComponentName = 'pgVideos';
export let VideosComponentOptions = {
    template: template,
    controller: VideosComponentController
};