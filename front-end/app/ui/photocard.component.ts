const template = `<div class="photocard">
<!--TODO add seo-->
<img class="background" ng-src="{{::$ctrl.url}}" alt="{{::$ctrl.name}}">
<div class="info" layout="column" layout-align="center center">
    <span class="name">{{::$ctrl.name}}</span>
    <span class="description">{{::$ctrl.description}}</span>
</div>
</div>`;

export class PhotocardComponentController {
    static $inject = ['$mdMedia'];

    constructor(private $mdMedia) {

    }
}


export let PhotocardComponentName = 'pgPhotocard';
export let PhotocardComponentOptions = {
    template,
    controller: PhotocardComponentController,
    bindings: {
        url: '<',
        name: '<',
        description: '<'
    }
};
