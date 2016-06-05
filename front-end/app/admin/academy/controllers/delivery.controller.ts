import {ISalonClient, ISalonClientResource, SalonClientResourceName} from "../../../resources/salon.client.resource";
import {ICourseResource, CourseResourceName, ICourse} from "../../../resources/course.resource";

enum Tabs {
    List,
    CreateNewContact,
    EmailAdv
}

export class AcademyDeliveryController {

    static $inject = ['$q', '$log', SalonClientResourceName, CourseResourceName];
    static componentName = 'AcademyDeliveryController';
    
    salons:ISalonClient[];
    editSalonModel:ISalonClient;
    showSalonEditForm:boolean;
    selectedTab: Tabs;
    courses: ICourse[];
    salonGroups: string[];
    
    constructor(private $q: ng.IQService, private $log: ng.ILogService, private SalonClientResource: ISalonClientResource,
    private CourseResource: ICourseResource) {
        this.selectedTab = Tabs.List; //contacts tab
        this.showSalonEditForm = false;
        this.courses = CourseResource.query();
        this.initSalons();
    }

    initSalons(){
        this.salons = this.SalonClientResource.query();
        this.salonGroups = this.SalonClientResource.getGroups();
        return this.$q.all([this.salons.$promise, this.salonGroups.$promise]);
    }

    showListTab(){
        this.editSalonModel = undefined;
        this.showSalonEditForm = false;
        this.selectedTab = Tabs.List;
    }
    
    createSalon(newSalonModel: ISalonClient) {
        this.$log.debug("createSalon ...");
            newSalonModel.$save()
                .then(()=> {
                    this.$log.debug("success createSalon...");
                    return this.initSalons();
                })
                .catch((err)=> {
                    this.$log.debug("fail createSalon..." + err);
                }).finally(()=> {
                    this.showListTab();
                });
    }

    editSalon(editSalonModel: ISalonClient):void {
        this.$log.debug("editSalonModel ...vm.editSalonModel._id===" + editSalonModel._id);
            editSalonModel.$save()
                .then(()=> {
                    return this.initSalons();
                })
                .catch((err)=> {
                    this.$log.debug("fail editCourse..." + err);
                }).finally(()=> {
                    this.showListTab();
                });
    }

    showEditForm(model:ISalonClient) {
        this.editSalonModel = model;
        this.showSalonEditForm = true;
    }

    deleteSalon(salonClient:ISalonClient):void {
        salonClient.$delete()
            .then(() => this.initSalons());
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice(list.indexOf(item), 1);
    }
    
}