import {PhotoServiceName, PhotoService} from "../resources/photo.service";

const template = `<div layout="column" flex>
    <actions layout="center">
        <!--<md-button flex ng-disabled="!$ctrl.ngModel.$modelValue" ng-click="$ctrl.delete()">delete</md-button>-->
        <md-button flex ng-disabled="!$ctrl.file" ng-click="$ctrl.cancel()">Cancel</md-button>
        <md-button flex ng-disabled="!$ctrl.file" ng-click="$ctrl.save()">Save</md-button>
    </actions>
    <image-container flex>
        <img ngf-src="$ctrl.file || $ctrl.imgUrl">
        <edit-wrapper layout="center center" ngf-select="$ctrl.select($file, $invalidFiles)" accept="image/*">
            <md-icon md-svg-icon="content:ic_create_24px"></md-icon>
        </edit-wrapper>
    </image-container>
</div>`;

export class ImageInputComponentController {

    static $inject = ["$mdDialog", "$mdToast", "$timeout", "$scope", "$element", "$attr", "ngModel", PhotoServiceName];
    static THUMB = "/content/images/avatar-placeholder.png";

    //bindings
    crop:string;
    aspectRatio:string;

    imgUrl: string;
    file: File;

    constructor(private $mdDialog:ng.material.IDialogService, private $mdToast, private $timeout: ng.ITimeoutService,
                private $scope, private $element: ng.IAugmentedJQuery, private $attr: ng.IAttributes,
                private ngModel:ng.INgModelController,  private photoService:PhotoService) {

        this.crop = $attr['crop'];
        this.aspectRatio = $attr['aspectRatio'];
        this.ngModel.$render = ()=>this.render();

        $element.find('img').on('error', () => {
            this.$timeout(()=>{
                this.imgUrl = ImageInputComponentController.THUMB;
            });
        });
    }

    select(file:File) {
        if (!file) return;

        if (this.crop) {
            this.$mdDialog.show({
                template: dialogTemplate,
                controller: DialogController,
                controllerAs: "$ctrl",
                bindToController: true,
                locals: {
                    inFile: file,
                    aspectRatio: this.aspectRatio
                }
            }).then((file) => {
                this.file = file;
            });
        }else{
            this.file = file;
        }
    }

    save(){
        if(!this.file) return;
        return this.photoService.save(this.file)
            .then((url)=>this.setViewValue(url))
            .catch((err)=>this.showErrorToast());
    }

    cancel(){
        this.file = undefined;
    }

    //noinspection ReservedWordAsName
    delete(){
        this.file = undefined;
        this.setViewValue();
    }

    private setViewValue(value = '') {
        this.ngModel.$setViewValue(value);
        this.ngModel.$render();
    }

    private render() {
        this.file = undefined;
        this.imgUrl = this.ngModel.$viewValue || ImageInputComponentController.THUMB;
    }

    private showErrorToast(text = 'Помилка, спробуйте пізніше') {
        this.$mdToast.showSimple(text);
    }

}

const dialogTemplate = `<md-dialog>
    <md-dialog-content style="width:70vw;height:70vh;">
         <img-crop area-type="rectangle"  
                  init-max-area="true"
                  image="$ctrl.inFile"
                  result-image-size="'max'"
                  result-image-format="'image/jpeg'"
                  result-blob="$ctrl.blob"
                  aspect-ratio="$ctrl.aspectRatio"
                  result-image="trash" 
                  ng-init="$ctrl.outBlob=null"></img-crop>
    </md-dialog-content>
    <md-dialog-actions layout="row">
        <span flex></span>
        <md-button ng-click="$ctrl.cancel()">
            Cancel
        </md-button>
        <md-button ng-click="$ctrl.ok()">
            Ok
        </md-button>
    </md-dialog-actions>
</md-dialog>`;

class DialogController {

    static $inject = ['$mdDialog', "inFile"];

    blob:Blob;

    constructor(private $mdDialog, public inFile:File) {

    }

    cancel() {
        this.$mdDialog.cancel();
    }

    ok() {
        this.$mdDialog.hide(this.blobToFile(this.blob, this.inFile.name));
    }


    private blobToFile(theBlob: Blob, fileName:string): File {
        var b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return <File>theBlob;
    }
}


export let ImageInputDirectiveName = 'pgImageInput';
imageInputDirectiveFactory.$inject = ["$controller"];
export function imageInputDirectiveFactory($controller: ng.IControllerService) {
    return {
        template: template,
        // controller: ImageInputComponentController,
        // controllerAs: "$ctrl",
        // bindToController: true,
        require: ['ngModel'],
        scope: {
            crop: "@",
            aspectRatio: "@"
        },
        link: (scope, elem, attrs, ctrls) => {
            scope.$ctrl = $controller(ImageInputComponentController, {
                $scope: scope,
                $element: elem,
                $attr: attrs,
                ngModel: ctrls[0]
            });
        }
    }
}
