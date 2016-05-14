
import {ISalonClientService} from "./academy/services/salon.client.service";
import {IDeliveryService} from "./academy/services/delivery.service";
import ISalonClient = pg.models.ISalonClient;

interface IEditSalonModel extends ISalonClient {
    oldIndex?:number;
}
export class AcademyDeliveryController {

    static $inject = ['salonClientService','$log'];
    static componentName = 'AcademyDeliveryController';

    salons:ISalonClient[];
    editSalonModel:IEditSalonModel;
    newSalonModel:ISalonClient;
    showSalonEditForm:boolean;
    showSalonCreateForm:boolean;

    
    constructor(private salonClientService:ISalonClientService, private $log:ng.ILogService) {

        salonClientService.get().then((models) => {
            this.salons = models;
        }).catch(function (err) {
            $log.error(err);
        });
    }


    //course creation start
    showCreateForm():void {
        this.showSalonEditForm = false;
        this.showSalonCreateForm = true;
    }

    createSalon(form:ng.IFormController):void {
        this.$log.debug("createCourse ...$valid" + form.$valid);
        if (form.$valid) {
            this.salonClientService.post(this.newSalonModel)
                .then((model)=> {
                    this.$log.debug("success createCourse...");
                    this.salons.push(model);
                }).catch((err)=> {
                this.$log.debug("fail createCourse..." + err);
            }).finally(()=> {
                this.showSalonCreateForm = false;
            });

        }
    }

    editSalon(form:ng.IFormController):void {
        this.$log.debug("editSalonModel ...$valid" + form.$valid);
        this.$log.debug("editSalonModel ...vm.editSalonModel._id===" + this.editSalonModel._id);
        if (form.$valid) {
            this.salonClientService.put(this.editSalonModel._id, this.editSalonModel)
                .then(()=> {
                    this.salons.splice(this.editSalonModel.oldIndex, 1, this.editSalonModel);
                    this.editSalonModel = <IEditSalonModel>{};
                }).catch((err)=> {
                this.$log.debug("fail editCourse..." + err);
            }).finally(()=> {
                this.showSalonEditForm = false;
            });
        }
    }

    showEditForm(model:IEditSalonModel):void {
        this.$log.debug("model for edit ..." + model._id + "" + model.name);
        this.editSalonModel = angular.copy(model);
        this.editSalonModel.oldIndex = this.salons.indexOf(model);
        this.showSalonEditForm = true;
        this.showSalonCreateForm = false;
    }


    deleteSalon(item:ISalonClient):void {
        this.salonClientService.delete(item._id).then(()=> {
            this.salons.splice(this.salons.indexOf(item), 1);
        });
    }

    deleteFromList(list:any[], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

}