import {EmailService} from "../../../resources/email.service";
import {ICourse} from "../../../resources/course.resource";

let template = `<md-card>
    <md-card-content>
        <form name="emailAdvForm" class="md-padding" novalidate>
            <md-input-container>
                <md-select aria-label="courses select" ng-model="$ctrl.model" required>
                    <md-option ng-repeat="course in $ctrl.courses" value="{{course._id}}">
                        <span ng-bind="course.name"></span>
                    </md-option>
                </md-select>
            </md-input-container>
            <md-button ng-click="$ctrl.send(emailAdvForm, $ctrl.model);">Розіслати</md-button>
        </form>
    </md-card-content>
</md-card>`;

class EmailAdvDirectiveController {
    static $inject = [EmailService.componentName];
    static as = "vm";

    model:any;
    courses:ICourse[];

    constructor(private emailService:EmailService) {
        let test = '';
    }

    send($form:ng.IFormController, courseId:string) {
        if ($form.$valid) {
            this.emailService.sendAdv(courseId).then(() => {
                alert('success');
            })
        }
    }
}

export let EmailAdvComponentName = 'pgEmailAdv';
export let EmailAdvComponentOptions: ng.IComponentOptions = {
    controller: EmailAdvDirectiveController,
    template: template,
    bindings: {
        courses: "="
    }
};