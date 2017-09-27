import {IBrend,BrendResourceName,IBrendResource} from "../../../resources/brend.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IConstants} from "../../../core/core.config";

const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Партнери</h3>
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
    <md-tooltip>Додати бренд</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="favor in $ctrl.favors" ng-disabled="!$root.it.can('modifySalon')"  ng-click="$ctrl.editFavor( favor) "
    >
     <img ng-src="{{favor.photo.url}}" class="md-avatar" alt="{{favor.name}}" />

        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::favor.name}}</p>
        </div>
  
        <md-icon ng-if="::$root.it.can('modifySalon')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, favor)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

export class BrendsComponentController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia",
        BrendResourceName, PagingServiceName, 'constants', "$location"];

    favors:IBrend[];
    paging:any;

    constructor(private $filter:ng.IFilterService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private favorResource:IBrendResource,
                private pagingService:PagingService, private constants:IConstants,private $location:ng.ILocationService) {
    }

    $onInit() {
        this.showPage();
    }

    addFavor(){
        this.$location.path("/salon/brend");
    }

    editFavor(favor: IBrend){
        this.$location.path(`/salon/brend/${favor._id}`);
    }

    showDeleteDialog(ev, favor:IBrend) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити бренд ${favor.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteFavor( favor );
            } );
    }

    deleteFavor(favor:IBrend) {
        favor.$delete().then( () => {
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
        this.favors = this.favorResource.query( {page: page,  perPage: 10},
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

export let BrendsComponentUrl = "/salon/brends";
export let BrendsComponentName = 'pgBrends';
export let BrendsComponentOptions = {
    template: template,
    controller: BrendsComponentController
};