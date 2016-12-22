import {ITransform,ITransformResource,TransformResourceName} from "../../../resources/transform.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";

const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>ЗМІНА ОБРАЗУ</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addTransform()" ng-if="::$root.it.can('modifySalon')"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати ЗМІНА ОБРАЗУ</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="transform in $ctrl.transforms"
                  ng-click="$ctrl.editTransform(transform)">
                  <img ng-if="transform.photos.length>0" ng-src="{{transform.photos[0].url}}" class="md-avatar" alt="{{transform.name}}" />
        <div class="md-list-item-text" layout="column">
            <h3>{{::transform.name}}</h3>
        </div>
        <md-icon class="md-secondary " 
                 ng-click="$ctrl.editTransform(transform)" md-svg-icon="communication:ic_message_24px">
            <md-tooltip>Деталі</md-tooltip>
        </md-icon>
        <md-icon ng-if="::$root.it.can('modifySalon')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, transform)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip >Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

export class TransformsComponentController {

    static $inject = ["$location", "$mdDialog", "$mdToast", PagingServiceName ,TransformResourceName];
    transforms:ITransform[];
    paging:any;
    constructor(private $location:ng.ILocationService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private pagingService:PagingService ,private TransformResource:ITransformResource) {

    }
    $onInit() {
        this.showPage();
    }

    addTransform() {
        this.$location.path( "/salon/transform" );
    }

    editTransform(transform:ITransform) {
        this.$location.path( `/salon/transform/${transform._id}` );
    }

    showDeleteDialog(ev, transform:ITransform) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Запис ${transform.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteTransform( transform );
            } );
    }

    
    deleteTransform(transform:ITransform) {
        transform.$delete().then( () => {
            this.$mdToast.showSimple( `ЗМІНА ОБРАЗУ видалено` );
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
        this.transforms = this.TransformResource.query( {page: page,  perPage: 10},
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

export let TransformsComponentUrl = "/salon/transforms";
export let TransformsComponentName = 'pgTransforms';
export let TransformsComponentOptions = {
    template: template,
    controller: TransformsComponentController
};