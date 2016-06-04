import {ISalonClient, ISalonClientResource, SalonClientResourceName} from "../../../resources/salon.client.resource";
import {ICourseResource, CourseResourceName, ICourse} from "../../../resources/course.resource";

enum Tabs {
    Contacts,
    CreateNewContact,
    EmailAdv
}

export interface IEditSalonModel extends ISalonClient {
    oldIndex?:number;
}

export class AcademyDeliveryController {

    static $inject = ['$log', SalonClientResourceName, CourseResourceName];
    static componentName = 'AcademyDeliveryController';

    salons:ISalonClient[];
    editSalonModel:IEditSalonModel;
    newSalonModel:ISalonClient;
    showSalonEditForm:boolean;
    showSalonCreateForm:boolean;
    selectedTab: Tabs;
    courses: ICourse[];
    
    constructor(private $log: ng.ILogService, private SalonClientResource: ISalonClientResource, 
    private CourseResource: ICourseResource) {
        this.selectedTab = Tabs.Contacts; //contacts tab
        this.showSalonEditForm = false;
        this.newSalonModel = new this.SalonClientResource();
        this.salons = SalonClientResource.query();
        this.courses = CourseResource.query();
    }

    createSalon(form:ng.IFormController, newSalonModel: ISalonClient) {
        this.$log.debug("createCourse ...$valid: " + form.$valid);
        if (form.$valid) {
            newSalonModel.$save()
                .then((salon)=> {
                    this.$log.debug("success createCourse...");
                    this.salons.push(salon);
                    this.newSalonModel = new this.SalonClientResource();
                    this.selectedTab = Tabs.Contacts;
                })
                .catch((err)=> {
                    this.$log.debug("fail createCourse..." + err);
                }).finally(()=> {
                    this.showSalonCreateForm = false;
                });
        }
    }

    editSalon(form:ng.IFormController, editSalonModel: IEditSalonModel):void {
        this.$log.debug("editSalonModel ...$valid" + form.$valid);
        this.$log.debug("editSalonModel ...vm.editSalonModel._id===" + editSalonModel._id);
        if (form.$valid) {
            editSalonModel.$save()
                .then(()=> {
                    this.salons.splice(editSalonModel.oldIndex, 1, editSalonModel);
                })
                .catch((err)=> {
                    this.$log.debug("fail editCourse..." + err);
                }).finally(()=> {
                    this.showSalonEditForm = false;
                });
        }
    }

    showEditForm(model:IEditSalonModel) {
        this.$log.debug("model for edit ..." + model._id + "" + model.name);
        this.editSalonModel = angular.copy(model);
        this.editSalonModel.oldIndex = this.salons.indexOf(model);
        this.showSalonEditForm = true;
        this.showSalonCreateForm = false;
    }

    deleteSalon(salonClient:ISalonClient):void {
        salonClient.$delete()
            .then(()=> {
                this.salons.splice(this.salons.indexOf(salonClient), 1);
            });
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any) {
        list.splice(list.indexOf(item), 1);
    }
}