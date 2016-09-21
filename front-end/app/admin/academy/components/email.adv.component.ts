import {EmailService} from "../../../resources/email.service";
import {ICourse} from "../../../resources/course.resource";

let template = `<md-card>
    <md-card-content>
        <form name="emailAdvForm" class="md-padding" novalidate>
            <md-input-container>
                <label>Курс</label>
                <md-select aria-label="courses select" ng-model="$ctrl.courseId" required>
                    <md-option ng-repeat="course in $ctrl.courses" value="{{course._id}}">
                        <span ng-bind="course.name"></span>
                    </md-option>
                </md-select>
            </md-input-container>
            <md-input-container>
                <label>Группа розсилки</label>
                <md-select aria-label="salonclient group select" ng-model="$ctrl.group" required>
                    <md-option ng-repeat="group in $ctrl.groups" value="{{group}}">
                        <span ng-bind="group"></span>
                    </md-option>
                </md-select>
            </md-input-container>
            <md-button ng-click="$ctrl.send(emailAdvForm, $ctrl.courseId, $ctrl.group);">Розіслати</md-button>
        </form>
    </md-card-content>
</md-card>`;

class EmailAdvDirectiveController {
    static $inject = [EmailService.componentName,"$mdDialog"];
    static as = "vm";
    static DEFAULT_GROUP = "global";
    
    courseId:string;
    group: string;
    courses:ICourse[];
    groups: string[];
    
    constructor(private emailService:EmailService,private $mdDialog:ng.material.IDialogService) {
        this.group = EmailAdvDirectiveController.DEFAULT_GROUP;
    }

    send($form:ng.IFormController, courseId:string, group = EmailAdvDirectiveController.DEFAULT_GROUP) {
        if ($form.$valid) {
            this.emailService.sendAdv(courseId).then(() => {
                this.$mdDialog.show(
                    this.$mdDialog.alert()
                        .clickOutsideToClose( true )
                        .title( 'Листи успішно розіслано. ' )
                        .textContent( 'Ви розіслали листи для групи: '+group )
                        .ariaLabel( 'Листи успішно розіслано. ' )
                        .ok( 'Закрити' )
                );
            })
        }
    }
}

export let EmailAdvComponentName = 'pgEmailAdv';
export let EmailAdvComponentOptions: ng.IComponentOptions = {
    controller: EmailAdvDirectiveController,
    template: template,
    bindings: {
        courses: "=",
        groups: "="
    }
};