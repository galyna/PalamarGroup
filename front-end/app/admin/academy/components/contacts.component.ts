import {ContactResourceName,IContactResource,IContact} from "../../../resources/contact.resource";
import {PagingServiceName,PagingService} from "../../../ui/admin.paging";
const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h3>Контакти академії</h3>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>

<md-button ng-click="$ctrl.addContact()" ng-disabled="!$root.it.can('modifyAcademy');"
           class="md-fab md-fab-fixed md-primary md-fab-bottom-right" aria-label="new">
    <md-icon md-svg-icon="content:ic_add_24px"></md-icon>
    <md-tooltip>Додати адміністратора</md-tooltip>
</md-button>

<md-list flex>
    <md-list-item class="md-2-line" ng-repeat="contact in $ctrl.contacts"  ng-click="$ctrl.editContact( contact)"
    >
     <img ng-src="{{contact.photo.url}}" class="md-avatar" alt="{{contact.name}}" />

        <div class="md-list-item-text" layout="column">
            <h3>Назва</h3>
            <p>{{::contact.name}}</p>
        </div>

  
        <md-icon class="md-secondary " ng-disabled="::!$root.it.can('modifyAcademy')"
                 ng-click="$ctrl.showDeleteDialog($event, contact)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifyAcademy')">Видалити</md-tooltip>
        </md-icon>
        <md-divider></md-divider>
    </md-list-item>
</md-list>
`;


export class ContactsComponentController {

    static $inject = ["$filter", "$location", "$mdDialog", "$mdToast", "$mdMedia",ContactResourceName, PagingServiceName];
    
    contacts:IContact[];
    paging:any;

    constructor(private $filter:ng.IFilterService, private $location:ng.ILocationService, private $mdDialog:ng.material.IDialogService, private $mdToast:ng.material.IToastService,
                private $mdMedia:ng.material.IMedia, private contactResource:IContactResource,
                private pagingService: PagingService) {

    }
    $onInit() {
        this.showPage();
    }

    addContact(){
        this.$location.path("/academy/contact");
    }

    editContact(contact: IContact){
        this.$location.path(`/academy/contact/${contact._id}`);
    }

    showDeleteDialog(ev, contact:IContact) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Адміністратора ${contact.name||''}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteFavor( contact );
            } );
    }

    deleteFavor(contact:IContact) {
        contact.$delete().then( () => {
            this.$mdToast.showSimple( `Адміністратора видалено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
    }

    private showPage(page = 1) {
        this.contacts = this.contactResource.query( {page: page},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }
}

export let ContactsComponentUrl = "/academy/contacts";
export let ContactsComponentName = 'pgContacts';
export let ContactsComponentOptions = {
    template: template,
    controller: ContactsComponentController
};