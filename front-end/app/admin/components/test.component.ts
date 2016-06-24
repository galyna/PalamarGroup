import {PhotoService, PhotoServiceName} from "../../resources/photo.service";
const template = `<div layout="column" class="md-padding">
    <pg-image-input url="$ctrl.model.url" on-update="$ctrl.updatePhoto(blob)" style="width:50%;">
    </pg-image-input>
    
     <md-input-container>
    <label>img: {{$ctrl.img}}</label>
    <input ng-model="$ctrl.img">
    </md-input-container>
    <md-input-container>
    <label>Url</label>
    <input ng-model="$ctrl.model.url">
</md-input-container>
    <md-input-container>
    <label>Name</label>
    <input ng-model="$ctrl.model.name">
</md-input-container>
    <md-input-container>
    <label>Order</label>
    <input ng-model="$ctrl.model.order">
</md-input-container>
    <md-input-container>
    <label>Description</label>
    <textarea ng-model="$ctrl.model.description"></textarea>
</md-input-container>
</div>`;

export class TestComponentController {
    model:any;
    img: any;

    static $inject = ["$rootScope", PhotoServiceName];
    
    constructor($rootScope, private photoService: PhotoService) {
        // $rootScope.$watch(()=>this.img, (val) => {
        //    console.log(val);
        // });
        // this.img = "/content/images/avatar-placeholder.png";
        this.model = {
            url: '/api/photo/asdsasad.jpg',
            name: 'name',
            order: 123,
            description: 'some descr'
        }
    }
    updatePhoto(blob:Blob){
        return this.photoService.save(blob)
            .then((url)=>this.model.url = url)
            .catch((err)=>console.log(err));
    }
}

export let testComponentUrl = "/test";
export let testComponentName = 'pgTest';
export let testComponentOptions = {
    template: template,
    controller: TestComponentController
};