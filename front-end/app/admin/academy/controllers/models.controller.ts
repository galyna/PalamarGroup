///<reference path="../../../../../typings/globals/ng-file-upload/index.d.ts"/>
import IPhoto = pg.models.IPhoto;
import {IConstants} from "../../../core/core.config";
import {IModel, IModelResource, ModelResourceName} from "../../../resources/model.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";

interface IEditIModelModel extends IModel {
    oldIndex?:number;
}


export class AcademyModelController {

    static $inject = [ModelResourceName, '$log', 'Upload', '$timeout', '$location', 'constants',
        "$mdToast", '$mdDialog',PagingServiceName];
    static componentName = 'AcademyModelController';

    models:IModel[];
    editModelModel:IEditIModelModel;
    newModelModel:IModel;
    showModelEditForm:boolean;
    showModelCreateForm:boolean;
    showFormPhotoUpload:boolean;
    paging:any;


    constructor(private ModelResource:IModelResource, private $log:ng.ILogService,
                private Upload:ng.angularFileUpload.IUploadService, private $timeout:ng.ITimeoutService,
                private $location:ng.ILocationService, private constants:IConstants,
                private $mdToast:ng.material.IToastService, private $mdDialog:ng.material.IDialogService,
                private pagingService:PagingService) {

        this.newModelModel = this.getBlankModel();
        this.showPage();
    }


    prev() {
        this.showPage( this.pagingService.prevPage() );
    }

    next() {
        this.showPage( this.pagingService.nextPage() );
    }

    private showPage(page = 1) {
        this.models = this.ModelResource.query( {page: page,  perPage:10},
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }

    //course creation start
    showCreateForm():void {
        this.newModelModel = this.getBlankModel();
        this.showModelEditForm = false;
        this.showModelCreateForm = true;
    }

    createModel(form:ng.IFormController):void {


            this.newModelModel.$save()
                .then( (model)=> {
                    this.$log.debug( "success createModel..." );
                    this.$mdToast.showSimple( `модель збережено` );
                    this.models.push( model );
                } )
                .catch( (err)=> {
                    this.$log.error( err );
                    this.showErrorDialog();
                } )
                .finally( ()=> {
                    this.showModelCreateForm = false;
                    this.showModelEditForm = false;
                    this.showPage();
                } );


    }

    //course creation start

    // course edit start
    editModel(form:ng.IFormController):void {

            this.editModelModel.$save()
                .then( ()=> {
                    this.models.splice( this.editModelModel.oldIndex, 1, this.editModelModel );
                    this.editModelModel = <IEditIModelModel>{};
                    this.$mdToast.showSimple( `модель збережено` );
                } )
                .catch( (err)=> {
                    this.$log.error( err );
                    this.showErrorDialog();
                } )
                .finally( ()=> {
                    this.showModelCreateForm = false;
                    this.showModelEditForm = false;
                    this.showPage();
                } );

    }

    showEditForm(model:IEditIModelModel):void {
        this.$log.debug( "model for edit ..." + model._id + "" + model.name );
        this.editModelModel = angular.copy( model );
        this.editModelModel.oldIndex = this.models.indexOf( model );
        this.showModelEditForm = true;
        this.showModelCreateForm = false;
    }

    //course edit end

    saveEditModelPhoto(file, photoName):void {
        this.fileUpload( file ).then( (response)=> {
            this.editModelModel[photoName] = response.data.url;
            this.$mdToast.showSimple( `фото збережено` );
        } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } );
    }

    saveNewModelPhoto(file, photoName):void {
        this.fileUpload( file ).then( (response)=> {
            this.newModelModel[photoName] = response.data.url;
            this.$mdToast.showSimple( `фото збережено` );
        } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } );
    }

    fileUpload(file) {
        return this.Upload.upload<{url:string}>( {
            method: 'POST',
            url: this.constants.photoUrl,
            data: {file: file}
        } );
    }

    showDeleteDialog(ev, model:IModel) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити модель ${model.name ? model.name : ""}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteModel( model );
            } );
    }

    deleteModel(model:IModel):void {
        model.$delete().then( ()=> {
            this.models.splice( this.models.indexOf( model ), 1 );
            this.$mdToast.showSimple( `модель видалено` );
        } ).catch( (err)=> {
            this.$log.error( err );
            this.showErrorDialog();
        } );
    }

    //noinspection JSMethodCanBeStatic
    deleteFromList(list:any[], item:any):void {
        list.splice( list.indexOf( item ), 1 );
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }

    private getBlankModel() {
        return new this.ModelResource( {
            fasPhotoUrl: '../content/images/models/fas.jpg',
            profilePhotoUrl: '../content/images/models/prifile.jpg',
            backPhotoUrl: '../content/images/models/back.jpg',
            fullSizePhotoUrl: '../content/images/models/fullsize.jpg'
        } );
    }

}




