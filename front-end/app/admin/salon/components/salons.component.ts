import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IConstants} from "../../../core/core.config";
import {SalonResourceName, ISalonResource, ISalon} from "../../../resources/salon.resource";


const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Салони</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addFavor()" ng-if="::$root.it.can('modifySalon')" 
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати салон</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="salon in $ctrl.salons" ng-disabled="!$root.it.can('modifySalon')"  ng-click="$ctrl.editFavor( salon) "
    >
    

        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::salon.name}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Адреса</h3>
            <p>{{::salon.address}} </p>
        </div>
  
        <md-icon ng-if="::$root.it.can('modifySalon')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, salon)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

export class SalonsComponentController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia",
        SalonResourceName, PagingServiceName, 'constants', "$location"];

    salons:ISalon[];
    paging:any;

    constructor(private $filter:ng.IFilterService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private SalonResource:ISalonResource,
                private pagingService:PagingService, private constants:IConstants,private $location:ng.ILocationService) {
    }

    $onInit() {
        this.showPage();
    }

    addFavor(){
        this.$location.path("/salon/salon");
    }

    editFavor(salon: ISalon){
        this.$location.path(`/salon/salon/${salon._id}`);
    }

    showDeleteDialog(ev, salon:ISalon) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити салон ${salon.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteFavor( salon );
            } );
    }

    deleteFavor(salon:ISalon) {
        salon.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err)=> {
            this.showErrorDialog();
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
    }

    private showPage(page = 1) {
        this.salons = this.SalonResource.query( {page: page},
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

export let SalonsComponentUrl = "/salon/salons";
export let SalonsComponentName = 'pgSalons';
export let SalonsComponentOptions = {
    template: template,
    controller: SalonsComponentController
};