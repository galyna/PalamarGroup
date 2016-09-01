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
    <md-list-item class="md-2-line" ng-repeat="favor in $ctrl.favors"  ng-click="$ctrl.showEditFavorDialog($event, favor)"
    >
        <div class="md-list-item-text" layout="column">
            <h3>Категорія</h3>
            <p>{{::favor.category}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::favor.name}}</p>
        </div>
        <div class="md-list-item-text" layout="column">
            <h3>Ціна</h3>
            <p>{{::favor.defPrice}} грн.</p>
        </div>
        <md-icon class="md-secondary " ng-click="$ctrl.showEditFavorDialog($event, favor)"
                 md-svg-icon="communication:ic_message_24px">
            <md-tooltip> Деталі</md-tooltip>
        </md-icon>
        <md-icon class="md-secondary " ng-disabled="::!$root.it.can('modifyAcademy')"
                 ng-click="$ctrl.showDeleteDialog($event, favor)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;

let addFavorDialogTemplate = `<md-dialog aria-label="Add favor" ng-cloak>
    <form name="favorEditForm" ng-submit="$ctrl.save(favorEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <h2>{{$ctrl.favor.event_name}}</h2>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>

        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content" layout="row">
                <md-subheader flex="1">

                    <md-input-container>
                        <label>Категорія</label>
                        <md-select ng-model="$ctrl.favor.category" >
                            <md-option ng-repeat="cat in $ctrl.categories" ng-value="cat.name"
                   >
                                {{cat.name}}
                            </md-option>
                        </md-select>
                    </md-input-container>
                    <!--TODO add validation-->
                    </md-input-container>
                    <md-input-container class="md-block ">
                        <label for="name">Назва</label>
                        <input id="name" ng-model="$ctrl.favor.name" name="name"/>
                        <!--TODO add validation-->
                    </md-input-container>
                    <md-input-container class="md-block">
                        <label for="defPrice">Ціна</label>
                        <input type="number" ng-model="$ctrl.favor.defPrice" id="defPrice" name="defPrice" />
                    </md-input-container>
                </md-subheader>

            </div>
        </md-dialog-content>
        <md-dialog-actions layout="row">
            <span flex></span>
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;

class EditFavorDialogController {

    private favor:IFavor;
    private originalFavor:IFavor;
    categories:any;

    constructor(private $mdDialog:ng.material.IDialogService, favor:IFavor, private constants:IConstants) {
        this.favor = angular.copy( favor );
        this.originalFavor = favor;
        this.categories = constants.favorCategories.map( function (category) {
            return {name: category};
        } );
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend( this.originalFavor, this.favor );
            this.$mdDialog.hide( this.originalFavor );
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class FavorsComponentController {

    static $inject = ["$filter", "$mdDialog", "$mdToast", "$mdMedia", FavorResourceName, PagingServiceName, 'constants'];
    favors:IFavor[];
    paging:any;


    constructor(private $filter:ng.IFilterService,
                private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private favorResource:IFavorResource,
                private pagingService:PagingService, private constants:IConstants) {
    }

    $onInit() {
        this.showPage();
    }

    addFavor() {
        var favor = new this.favorResource();
        favor.category = this.constants.favorCategories[0];
        favor.defPrice = 200;

        this.$mdDialog.show( {
            template: addFavorDialogTemplate,
            controller: EditFavorDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                favor: favor
            },
            parent: angular.element( document.body ),

        } ).then( (favor) => this.saveFavor( favor ) );
    }

    showEditFavorDialog(ev:MouseEvent, favor:IFavor) {
        this.$mdDialog.show( {
            template: addFavorDialogTemplate,
            controller: EditFavorDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                favor: favor
            },
            parent: angular.element( document.body ),
            targetEvent: ev,
        } ).then( (favor) => this.saveFavor( favor ) );
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