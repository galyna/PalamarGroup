/**
 * Created by Galyna on 14.05.2016.
 */
/**
 * Created by Galyna on 12.05.2016.
 */


import {IModelService} from "../services/model.service";
import {IConstants} from "../app.config";
import IModel = pg.models.IModel;
import IPhoto = pg.models.IPhoto;

interface IEditIModelModel extends IModel {
    oldIndex?:number;
}


export class AcademyModelController {

    static $inject = ['modelService', '$log', 'Upload', '$timeout', '$location', 'constants'];
    static componentName = 'AcademyModelController';

    models:IModel[];
    editModelModel:IEditIModelModel;
    newModelModel:IModel;
    showModelEditForm:boolean;
    showModelCreateForm:boolean;
    showFormPhotoUpload:boolean;


    constructor(private modelService:IModelService, private $log:ng.ILogService,
                private Upload:ng.angularFileUpload.IUploadService, private $timeout:ng.ITimeoutService,
                private $location:ng.ILocationService, private constants:IConstants) {

        modelService.get().then((models) => {
            this.models = models;
        }).catch(function (err) {
            $log.error(err);
        });

        this.newModelModel = constants.newModel;
    }


    //course creation start
    showCreateForm():void {
        this.newModelModel = this.constants.newModel;
        this.showModelEditForm = false;
        this.showModelCreateForm = true;
    }

    createModel(form:ng.IFormController):void {
        this.$log.debug("createCourse ...$valid" + form.$valid);
        if (form.$valid) {
            this.modelService.post(this.newModelModel)
                .then((model)=> {
                    this.$log.debug("success createCourse...");
                    this.models.push(model);
                }).catch((err)=> {
                this.$log.debug("fail createCourse..." + err);
            }).finally(()=> {
                this.showModelCreateForm = false;
            });

        }
    }

    //course creation start

    // course edit start
    editModel(form:ng.IFormController):void {
        this.$log.debug("editModelModel ...$valid" + form.$valid);
        this.$log.debug("editModelModel ...vm.editModelModel._id===" + this.editModelModel._id);
        if (form.$valid) {
            this.modelService.put(this.editModelModel._id, this.editModelModel)
                .then(()=> {
                    this.models.splice(this.editModelModel.oldIndex, 1, this.editModelModel);
                    this.editModelModel = <IEditIModelModel>{};
                }).catch((err)=> {
                this.$log.debug("fail editCourse..." + err);
            }).finally(()=> {
                this.showModelEditForm = false;
            });
        }
    }

    showEditForm(model:IEditIModelModel):void {
        this.$log.debug("model for edit ..." + model._id + "" + model.name);
        this.editModelModel = angular.copy(model);
        this.editModelModel.oldIndex = this.models.indexOf(model);
        this.showModelEditForm = true;
        this.showModelCreateForm = false;
    }

    //course edit end

    saveEditModelPhoto(file, photoName):void {
        this.fileUpload(file).then((response)=> {
            this.editModelModel[photoName] = response.data.url;
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        })
    }

    saveNewModelPhoto(file, photoName):void {
        this.fileUpload(file).then((response)=> {
            this.newModelModel[photoName] = response.data.url;
        }).catch((err)=> {
            this.$log.debug("fail upload file..." + err);
        })
    }

    fileUpload(file) {
        return this.Upload.upload<{url:string}>({
            method: 'POST',
            url: this.constants.photoUrl,
            data: {file: file}
        });
    }
    

    deleteModel(item:IModel):void {
        this.modelService.delete(item._id).then(()=> {
            this.models.splice(this.models.indexOf(item), 1);
        });
    }

    deleteFromList(list:any[], item:any):void {
        list.splice(list.indexOf(item), 1);
    }

}




