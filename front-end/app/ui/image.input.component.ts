const template = `
    <img ngf-src="$ctrl.model || $ctrl.thumb">
    <image-container layout="center center" ngf-select="$ctrl.onSelect($file, $invalidFiles)" accept="image/*">
        <md-icon md-svg-icon="content:ic_create_24px"></md-icon>
    </image-container>`;

const dialogTemplate = `<md-dialog>
    <md-dialog-content style="width:70vw;height:70vh;">
         <img-crop area-type="rectangle"  
                  init-max-area="true"
                  image="$ctrl.inFile"
                  result-image-size="'max'"
                  result-image-format="'image/jpeg'"
                  result-blob="$ctrl.outFile"
                   aspect-ratio="$ctrl.aspectRatio"
                  result-image="trash" 
                  ng-init="$ctrl.outFile=null"></img-crop>
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

    outFile: string;

    constructor(private $mdDialog, public inFile: File){

    }

    cancel() {
        this.$mdDialog.cancel();
    }

    ok(){
        this.$mdDialog.hide(this.outFile);
    }
}

export class ImageInputComponentController{

    static $inject = ["$mdDialog"];

    thumb: string;
    model: any;
    ngModel: ng.INgModelController;

    constructor(private $mdDialog: ng.material.IDialogService, private crop: boolean){}
    
    $onInit(){
        this.crop = this.crop || false;
        this.ngModel.$render = () => this.render();
        this.thumb = "/content/images/avatar-placeholder.png";
    }

    onSelect($file, $invalidFiles){
        if(!$file) return;
        if(!this.crop){
            return this.setViewValue($file);
        }
        this.$mdDialog.show({
            template: dialogTemplate,
            controller: DialogController,
            controllerAs: "$ctrl",
            bindToController: true,
            locals: {
                inFile: $file,
                aspectRatio: this.aspectRatio
            }
        }).then(($file) => this.setViewValue($file));
    }

    setViewValue(value) {
        this.ngModel.$setViewValue(value);
        this.ngModel.$render();
    }

    render() {
        this.model = this.ngModel.$viewValue;
    }

}

export let ImageInputComponentName = 'pgImageInput';
export let ImageInputComponentOptions: ng.IComponentOptions = {
    template: template,
    controller: ImageInputComponentController,
    require: {
        ngModel: 'ngModel'
    },
    bindings: {
        crop: "@",
        "aspectRatio": "@"
    }
};
