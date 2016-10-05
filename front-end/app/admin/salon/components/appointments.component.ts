import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IFavor} from "../../../resources/favor.resource";
import IMasterFavor = pg.models.IMasterFavor;
const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <md-subheader>Записи на прийом</md-subheader>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>
<md-list flex class="orders-list">

    <md-list-item class="md-2-line" ng-repeat="appointment in $ctrl.appointments"
                  ng-class="{answered:appointment.answered, approved:appointment.booked}"
                  ng-click=" $ctrl.showEditOrderDialog($event, appointment)">
        <div class="md-list-item-text" layout="column">

            <h2 ng-if="appointment.booked"> ЗАПИС ПІДТВЕРДЖЕНО</h2>
            <p ng-if="appointment.answered">Замовнику передзвонили </p>
            <h3>{{::appointment.name||'Анонім'}} {{::appointment.phone||appointment.email||''}} </h3>
            <p>{{::$ctrl.getOrderTitle(appointment)}}</p>
            <p>Запис створено {{appointment.date|date:'dd.MM.yyyy'}}</p>
            <p ng-if="appointment.answered">Замовнику передзвонили </p>
        </div>
        <div class="md-secondary md-margin">
            <md-checkbox ng-model="appointment.answered" ng-disabled="::!$root.it.can('modifySalon')"
                         ng-click="::$root.it.can('modifySalon') && $ctrl.saveAnsewerOrder(appointment)"></md-checkbox>
            <md-tooltip>
                Замовнику передзвонили
            </md-tooltip>
        </div>

        <div class="md-secondary md-margin">
            <md-checkbox ng-model="appointment.booked" ng-disabled="::!$root.it.can('modifySalon')"
                         ng-click="::$root.it.can('modifySalon') && $ctrl.saveBookedOrder(appointment)"></md-checkbox>
            <md-tooltip md-direction="top">
                ЗАПИС ПІДТВЕРДЖЕНО
            </md-tooltip>
        </div>

        <md-icon class="md-secondary " ng-click="$ctrl.showEditOrderDialog($event, appointment)"
                 md-svg-icon="communication:ic_message_24px">
            <md-tooltip> Деталі</md-tooltip>
        </md-icon>

        <md-icon class="md-secondary " ng-disabled="::!$root.it.can('modifySalon')"
                 ng-click=" ::$root.it.can('modifySalon') && $ctrl.showDeleteDialog($event, appointment)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip ng-if="::$root.it.can('modifySalon')">Видалити</md-tooltip>
        </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>

`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <p ng-if="$ctrl.appointment.date">Запис створено {{$ctrl.appointment.date|date:'dd.MM.yyyy'}}</p>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>

        </md-toolbar>
        <md-dialog-content>
            <div class="md-dialog-content md-paddimg"  layout="column">
                <div  layout-gt-sm="row" layout="column">
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">
                        <md-subheader class="md-no-sticky">Інформація від замовника
                        </md-subheader>
                        <md-input-container class="md-block">
                            <label>Замовник</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.name">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Телфон</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.phone">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Email</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.email">
                        </md-input-container>
                        <md-input-container class="md-block">
                            <label>Коментар замовника</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.comment"/>
                        </md-input-container>
                    </div>
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">
                        <md-subheader class="md-no-sticky">Майстер та послуги
                        </md-subheader>

                        <md-input-container class="md-block">
                            <label>Майстер</label>
                            <md-select ng-model="$ctrl.appointment.master" ng-change="$ctrl.changeMaster(id)">
                                <md-option ng-repeat="master in $ctrl.masters" ng-value="master._id">
                                    {{ master.name }}
                                </md-option>
                            </md-select>
                        </md-input-container>

                        <md-input-container class="md-block">
                            <md-subheader class="md-no-sticky">Послуги</md-subheader>
                            <div ng-repeat="service in $ctrl.appointment.favors">

                                <div layout="row">
                                    <div class="md-margin md-padding " id="prokgram" name="program">
                                        {{service.favor.name}}
                                    </div>
                                    <div class="md-margin md-padding " id="program" name="program">{{service.price}}
                                    </div>
                                    <md-button ng-if="::$root.it.can('modifySalon')" class="md-icon-button"
                                               ng-click="$ctrl.deleteService(service)">
                                        <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                    </md-button>
                                </div>
                            </div>
                        </md-input-container>


                        <md-subheader class="md-no-sticky">Додати послугу
                        </md-subheader>

                        <md-select ng-model="$ctrl.newService" ng-model-options="{trackBy: '$value.favor._id'}">
                            <md-option ng-repeat="favor in $ctrl.favors" ng-value="favor">
                                {{ favor.favor.name }}
                            </md-option>
                        </md-select>
                        <md-input-container layout="row" class="md-block">
                            <label for="newProgram">ЦІНА</label>
                            <input type="number" ng-model="$ctrl.newService.price"/>

                        </md-input-container>
                        <md-button ng-disabled="!$ctrl.newService.favor" class=" " ng-click="$ctrl.addService()">
                            Додати
                        </md-button>

                    </div>
                    <div flex="100" flex-gt-sm="30" layout="column" class="md-margin">

                        <md-subheader class="md-no-sticky">Адміністративна частина
                        </md-subheader>
                        <md-input-container layout="row" class="md-block">
                            <md-checkbox ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.answered">
                                Замовнику передзвонили
                            </md-checkbox>
                        </md-input-container>
                        <md-input-container layout="row" class="md-block">
                            <md-checkbox ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.booked">
                                Участь у заході підтверджено
                            </md-checkbox>
                        </md-input-container>

                        <md-input-container>
                            <label>Коментар адміністратора</label>
                            <textarea ng-disabled="::!$root.it.can('modifySalon')"
                                      ng-model="$ctrl.appointment.admin_comment"></textarea>
                        </md-input-container>

                        <md-button type="submit" ng-click="$ctrl.AddToCalendar()" aria-label="save">
                            Додати у графік майстра
                        </md-button>

                    </div>
                </div>
                <div flex  layout="row" >
                    <pg-master-scheduler mode='appointment' masterid="$ctrl.appointment.master"></pg-master-scheduler>
                </div>

            </div>
           
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifySalon')">
            <span flex></span>
           
            <md-button ng-click="$ctrl.cancel()" aria-label="cancel">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;
class EditDialogController {

    static $inject = ['$mdDialog', 'appointment'];
    private masters:IMaster[];
    private favors:any[];
    private newService:IMasterFavor;
    private appointment:IAppointment;
    private originalAppointment:IAppointment;


    constructor(private $mdDialog:ng.material.IDialogService, appointment:IAppointment) {
        this.appointment = angular.copy( appointment );
        this.originalAppointment = appointment;
        this.masters.forEach( (m)=> {
            if (m._id === this.appointment.master) {
                this.favors = m.services;
            }
        } )

    }
    AddToCalendar(){}
    deleteService(favor) {
        this.appointment.favors.splice( this.appointment.favors.indexOf( favor ), 1 )
    }

    addService(favor:IMasterFavor) {
        this.appointment.favors.push( this.newService )
    }


    changeMaster(master) {
        if (master != this.appointment.master) {
            this.appointment.favors = [];
            this.masters.forEach( (m)=> {
                if (m._id === this.appointment.master) {
                    this.favors = m.services;
                    return;
                }
            } )
        }
    }

    save($form:ng.IFormController) {
        if ($form.$valid) {
            angular.extend( this.originalAppointment, this.appointment );
            this.$mdDialog.hide( this.originalAppointment );
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class AppointmentsComponentController {

    static $inject = [AppointmentResourceName, PagingServiceName, "$filter", "$mdDialog", "$mdToast", MasterResourceName];
    masters:IMaster[];
    appointments:IAppointment[];
    paging:any;

    constructor(private AppointmentResource:IAppointmentResource, private pagingService:PagingService,
                private $filter:ng.IFilterService, private $mdDialog:ng.material.IDialogService,
                private $mdToast:ng.material.IToastService, private MasterResource:IMasterResource) {

    }

    $onInit() {
        this.masters = this.MasterResource.query( {populate: 'services.favor'} );
        this.masters.$promise.then( (courses) => {
                // this.courses = this.orderByFilter( courses, "order" )
            }
        );

        this.showPage();
    }

    prev() {
        this.showPage( this.pagingService.prevPage() );
    }

    next() {
        this.showPage( this.pagingService.nextPage() );
    }

    private showPage(page = 1) {
        this.appointments = this.AppointmentResource.query( {
                page: page,
                sort: {"answered": 1, "booked": -1, "date": -1},
                populate: 'favors.favor'
            },
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders( headers );
                this.pagingService.update( {page: page, perPage: perPage, total: total} );
                this.paging = angular.copy( this.pagingService.params() );
            } );
    }

    showEditOrderDialog(ev:MouseEvent, appointment:IAppointment) {

        this.$mdDialog.show( {
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                appointment: appointment,
                masters: this.masters
            },
            parent: angular.element( document.body ),
            targetEvent: ev,
        } ).then( (appointment) => this.saveAppointment( appointment ) );
    }

    saveAnsewerOrder(appointment:IAppointment) {
        appointment.answered = !appointment.answered;
        this.saveAppointment( appointment );
    }

    saveBookedOrder(appointment:IAppointment) {
        appointment.booked = !appointment.booked;
        this.saveAppointment( appointment );
    }

    saveAppointment(appointment:IAppointment) {

        appointment.$save().then( () => {
            this.$mdToast.showSimple( `Запис збережено` );
        } ).catch( (err)=> {
            this.showErrorDialog();
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    showDeleteDialog(ev, appointment:IAppointment) {
        let confirm = this.$mdDialog.confirm()
            .title( "Підтвердження дії" )
            .textContent( `Ви дійсно бажаєте видалити Запис ${appointment.name || ''}?` )
            .ariaLabel( "Підтвердження дії" )
            .targetEvent( ev )
            .ok( 'Так' )
            .cancel( 'Ні' );

        return this.$mdDialog.show( confirm )
            .then( () => {
                return this.deleteOrder( appointment );
            } );
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }

    deleteOrder(appointment:IAppointment) {

        appointment.$delete().then( () => {
            this.$mdToast.showSimple( `Замовлення видалено` );
        } ).catch( (err) => {
            this.$mdToast.showSimple( err.message );
        } ).finally( ()=> {
            this.showPage( this.pagingService.currentPage() );
        } );
        ;
    }

    getOrderTitle(appointment:IAppointment) {
        let format = "dd.MM.yyyy";

        return "";

    }

}

export let AppointmentsComponentUrl = "/salon/appointments";
export let AppointmentsComponentName = 'pgAppointments';
export let AppointmentsComponentOptions = {
    template: template,
    controller: AppointmentsComponentController
};