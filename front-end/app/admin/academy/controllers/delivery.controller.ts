import {ISalonClient, ISalonClientResource, SalonClientResourceName} from "../../../resources/salon.client.resource";

export interface IEditSalonModel extends ISalonClient {
    oldIndex?:number;
}
export class AcademyDeliveryController {

    static $inject = [SalonClientResourceName, '$log'];
    static componentName = 'AcademyDeliveryController';

    salons:ISalonClient[];
    editSalonModel:IEditSalonModel;
    newSalonModel:ISalonClient;
    showSalonEditForm:boolean;
    showSalonCreateForm:boolean;

    
    constructor(private SalonClientResource: ISalonClientResource, private $log: ng.ILogService) {
        this.salons = SalonClientResource.query();
    }

    showCreateForm():void {
        this.showSalonEditForm = false;
        this.showSalonCreateForm = true;
        this.newSalonModel = new this.SalonClientResource();
    }

    createSalon(form:ng.IFormController, newSalonModel: ISalonClient) {
        this.$log.debug("createCourse ...$valid: " + form.$valid);
        if (form.$valid) {
            newSalonModel.$save()
                .then((salon)=> {
                    this.$log.debug("success createCourse...");
                    this.salons.push(salon);
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