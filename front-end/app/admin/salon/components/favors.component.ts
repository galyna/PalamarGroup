import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {FavorResourceName, IFavorResource, IFavor} from "../../../resources/favor.resource";
import {IConstants} from "../../../core/core.config";


const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Послуги</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addFavor()" ng-disabled="!$root.it.can('modifyAcademy');"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати послугу</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="favor in $ctrl.favors"  ng-click="$ctrl.editFavor( favor)"
    >
     <img ng-src="{{favor.photo.url}}" class="md-avatar" alt="{{favor.name}}" />
        <div class="md-list-item-text" layout="column">
            <h3>Категорія</h3>
            <p>{{::favor.category.name}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::favor.name}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Ціна</h3>
            <p>{{::favor.defPrice}} грн.</p>
        </div>
  
        <md-icon class="md-secondary " ng-disabled="::!$root.it.can('modifyAcademy')"
                 ng-click="$ctrl.showDeleteDialog($event, favor)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;


export class FavorsComponentController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia",
        FavorResourceName, PagingServiceName, 'constants', "$location"];
    
    favors:IFavor[];
    paging:any;
    
    constructor(private $filter:ng.IFilterService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private favorResource:IFavorResource,
                private pagingService:PagingService, private constants:IConstants,private $location:ng.ILocationService) {
    }

    $onInit() {
        this.showPage();
    }

    addFavor(){
        this.$location.path("/salon/favor");
    }

    editFavor(favor: IFavor){
        this.$location.path(`/salon/favor/${favor._id}`);
    }


    saveFavor(favor:IFavor) {

        favor.$save().then( () => {
            this.$mdToast.showSimple( `Послугу збережено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    showDeleteDialog(ev, favor:IFavor) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити послугу ${favor.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteFavor( favor );
            } );
    }

    deleteFavor(favor:IFavor) {
        favor.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
    }

    private showPage(page = 1) {
        this.favors = this.favorResource.query( {page: page},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }
}

export let FavorsComponentUrl = "/salon/favors";
export let FavorsComponentName = 'pgFavors';
export let FavorsComponentOptions = {
    template: template,
    controller: FavorsComponentController
};