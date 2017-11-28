import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IConstants} from "../../../core/core.config";
import {LearnResourceName, ILearnResource, ILearn} from "../../../resources/learn.resource";


const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Вчимося у професіоналів</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.add()" ng-if="::$root.it.can('modifySalon')" 
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати екземпляр</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="learn in $ctrl.learns" ng-disabled="!$root.it.can('modifySalon')"  ng-click="$ctrl.edit( learn) ">
        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::learn.name}}</p>
        </div>
        <md-icon ng-if="::$root.it.can('modifySalon')" class="md-secondary " 
                 ng-click="$ctrl.showDeleteDialog($event, learn)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

export class LearnsComponentController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia",
        LearnResourceName, PagingServiceName, 'constants', "$location"];

    learns:ILearn[];
    paging:any;

    constructor(private $filter:ng.IFilterService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private LearnResource:ILearnResource,
                private pagingService:PagingService, private constants:IConstants,private $location:ng.ILocationService) {
    }

    $onInit() {
        this.showPage();
    }

    add(){
        this.$location.path("/salon/learn");
    }

    edit(learn: ILearn){
        this.$location.path(`/salon/learn/${learn._id}`);
    }

    showDeleteDialog(ev, learn:ILearn) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити єкземпляр ${learn.name}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteFavor( learn );
            } );
    }

    deleteFavor(learn:ILearn) {
        learn.$delete().then( () => {
            this.$mdToast.showSimple( `Єкземпляр видалено` );
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
        this.learns = this.LearnResource.query( {page: page,  perPage: 10},
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

export let LearnsComponentUrl = "/salon/learns";
export let LearnsComponentName = 'pgLearns';
export let LearnsComponentOptions = {
    template: template,
    controller: LearnsComponentController
};
