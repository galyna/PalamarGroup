import {MasterResourceName, IMasterResource, IMaster} from "../../../resources/master.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";

const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Команда</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addMaster()" ng-if="::$root.it.can('modifySalon')"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати майстра</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="master in $ctrl.masters"
                  ng-click="$ctrl.editMaster(master)">
                  <img ng-src="{{master.photo.url}}" class="md-avatar" alt="{{master.name}}" />
        <div class="md-list-item-text" layout="column">
            <h3>{{::master.name}}</h3>
        </div>
        <md-icon class="md-secondary " 
                 ng-click="$ctrl.editMaster(master)" md-svg-icon="communication:ic_message_24px">
            <md-tooltip>Деталі</md-tooltip>
        </md-icon>
        <md-icon ng-if="::$root.it.can('modifySalon')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, master)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip >Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

export class MastersComponentController {
    static $inject = [ "$location", "$mdDialog", "$mdToast",  MasterResourceName, PagingServiceName];

    masters:IMaster[];
    paging:any;

    constructor(private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private masterResource:IMasterResource,
                private pagingService:PagingService) {

    }

    $onInit() {
        this.showPage();
    }

    addMaster() {
        this.$location.path( "/salon/master" );
    }

    editMaster(master:IMaster) {
        this.$location.path( `/salon/master/${master._id}` );
    }

    showDeleteDialog(ev, master:IMaster) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Запис ${master.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteMaster( master );
            } );
    }

    deleteMaster(master:IMaster) {
        master.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err)=> {

            this.showErrorDialog();
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
    }

    prev() {
        this.showPage( this.pagingService.prevPage() );
    }

    next() {
        this.showPage( this.pagingService.nextPage() );
    }

    private showPage(page = 1) {
        this.masters = this.masterResource.query( {page: page,  perPage: 10},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }
}

export let MastersComponentUrl = "/salon/masters";
export let MastersComponentName = "pgMasters";
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};