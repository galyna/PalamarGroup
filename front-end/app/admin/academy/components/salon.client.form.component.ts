import {ISalonClient, SalonClientResourceName, ISalonClientResource} from "../../../resources/salon.client.resource";

class Controller {
    static $inject = ["$scope", SalonClientResourceName];

    salonClient: ISalonClient;
    model: ISalonClient;
    onSave: (args: {salonClient: ISalonClient}) => any;
    onCancel: () => any;

    constructor(private $scope: ng.IScope, private SalonClientResource: ISalonClientResource) {
        this.init();
        $scope.$watch(() => this.model, () => this.init);
    }

    init() {
        this.salonClient = this.model ? angular.copy(this.model) : new this.SalonClientResource();
    }

    save($form: ng.IFormController){
        if($form.$valid) {
            this.onSave({salonClient: this.salonClient});
            this.init();
            console.log('submitted');
        }
    }

    cancel(){
        this.onCancel();
        this.init();
        console.log('cancelled');
    }
}

let template = `
<form name="salonModelForm" ng-submit="$ctrl.save(salonModelForm)" class="md-padding" novalidate>
    <md-content>
        <md-input-container class="md-block">
            <md-icon md-svg-icon="social:ic_person_24px"></md-icon>
            <label for="name">Назва салону</label>
            <input id="name" ng-model="$ctrl.salonClient.name" type="text" name="name">
        </md-input-container>
        <md-input-container class="md-block">
            <md-icon md-svg-icon="communication:ic_email_24px"></md-icon>
            <label for="email">email</label>
            <input id="email" ng-model="$ctrl.salonClient.email" type="text" name="email">
        </md-input-container>
        <md-input-container class="md-block">
            <md-icon md-svg-icon="communication:ic_phonelink_ring_24px"></md-icon>
            <label for="phone">Телефон</label>
            <input id="phone" ng-model="$ctrl.salonClient.phone" type="text" name="phone">
        </md-input-container>
        <md-input-container class="md-block">
            <label for="address">Адреса</label>
            <input id="address" ng-model="$ctrl.salonClient.address" type="text" name="address">
        </md-input-container>
        <!--<md-input-container class="md-block">-->
            <!--<label for="address">Гуппа</label>-->
            <!--<input id="group" ng-model="$ctrl.salonClient.group" type="text" name="group">-->
        <!--</md-input-container>-->
    </md-content>
    <div layout="row" md-whiteframe="4">
        <md-button ng-click="$ctrl.cancel()" class=" ">Скасувати</md-button>
        <md-button type="submit" class="md-raised md-primary">Зберегти</md-button>
    </div>
</form>
`;

export let SalonClientFormComponentName = 'pgSalonClientForm';
export let SalonClientFormComponentOptions: ng.IComponentOptions = {
    controller: Controller,
    template: template,
    bindings: {
        model: "<",
        onSave: "&",
        onCancel: "&"
    }
}