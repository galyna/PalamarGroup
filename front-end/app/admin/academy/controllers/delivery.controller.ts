import {ISalonClient, ISalonClientResource, SalonClientResourceName} from "../../../resources/salon.client.resource";
import {ICourseResource, CourseResourceName, ICourse} from "../../../resources/course.resource";

enum Tabs {
    List,
    CreateNewContact,
    EmailAdv
}

export class AcademyDeliveryController {

    static $inject = ['$q', '$log', SalonClientResourceName, CourseResourceName, '$mdDialog'];
    static componentName = 'AcademyDeliveryController';

    salons:ISalonClient[];
    editSalonModel:ISalonClient;
    showSalonEditForm:boolean;
    selectedTab:Tabs;
    courses:ICourse[];
    salonGroups:string[];

    constructor(private $q:ng.IQService, private $log:ng.ILogService, private SalonClientResource:ISalonClientResource,
                private CourseResource:ICourseResource, private $mdDialog:ng.material.IDialogService) {
        this.selectedTab = Tabs.List; //contacts tab
        this.showSalonEditForm = false;
        this.courses = CourseResource.query();
        this.initSalons();
    }

    initSalons() {
        this.salons = this.SalonClientResource.query();
        this.salonGroups = this.SalonClientResource.getGroups();
        return this.$q.all( [this.salons.$promise, this.salonGroups.$promise] );
    }

    showListTab() {
        this.editSalonModel = undefined;
        this.showSalonEditForm = false;
        this.selectedTab = Tabs.List;
    }

    createSalon(newSalonModel:ISalonClient) {
        this.$log.debug( "createSalon ..." );
        newSalonModel.$save()
            .then( ()=> {
                this.$log.debug( "success createSalon..." );
                return this.initSalons();
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } ).finally( ()=> {
            this.showListTab();
        } );
    }

    editSalon(editSalonModel:ISalonClient):void {
        this.$log.debug( "editSalonModel ...vm.editSalonModel._id===" + editSalonModel._id );
        editSalonModel.$save()
            .then( ()=> {
                return this.initSalons();
            } )
            .catch( (err)=> {
                this.$log.error( err );
                this.showErrorDialog();
            } ).finally( ()=> {
            this.showListTab();
        } );
    }

    showEditForm(model:ISalonClient) {
        this.editSalonModel = model;
        this.showSalonEditForm = true;
    }

    deleteSalon(salonClient:ISalonClient):void {
        salonClient.$delete()
            .then( () => this.initSalons() );
    }

    showDeleteDialog(salonClient:ISalonClient) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Салон ${salonClient.name || ''}?` )
            .ariaLabel( "Підтвердження дії" )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteSalon( salonClient );
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

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice( list.indexOf( item ), 1 );
    }

}