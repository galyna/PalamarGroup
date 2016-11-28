import {IAppointment, AppointmentResourceName, IAppointmentResource} from "../../../resources/appointment.resource";
import {IMaster, MasterResourceName, IMasterResource, ITask, IScheduler} from "../../../resources/master.resource";
import {PagingServiceName, PagingService} from "../../../ui/admin.paging";
import {IFavor} from "../../../resources/favor.resource";
import IMasterFavor = pg.models.IMasterFavor;
import {IConstants} from "../../../core/core.config";
const template = `<md-toolbar>
    <div class="md-toolbar-tools">
        <h1>Записи на прийом</h1>
        <span flex></span>
        <pg-admin-paging
                params="$ctrl.paging"
                on-prev="$ctrl.prev()"
                on-next="$ctrl.next()"
        ></pg-admin-paging>
    </div>
</md-toolbar>
<div flex="100" layout="row" layout-xs="column" class="md-padding">
    <div  class=" md-margin"  layout="row">
        <label>Від</label>
        <md-datepicker  placeholder="Дата" flex ng-model="$ctrl.start"></md-datepicker>
    </div>
    <div class=" md-margin"  layout="row">
        <label>До</label>
        <md-datepicker  placeholder="Дата" flex ng-model="$ctrl.end"></md-datepicker>
    </div>   
        <md-button class="md-raised md-margin" ng-click="$ctrl.Search()">Пошук</md-button>
    
</div>
<md-list flex class="orders-list">

    <md-list-item class="md-2-line" ng-repeat="appointment in $ctrl.appointments"
                  ng-class="{answered:appointment.status==3, approved:appointment.status==1, bay:appointment.status==2}"
                  ng-click=" $ctrl.showEditOrderDialog($event, appointment)">
        
            <div class="md-list-item-text" style='min-width: 130px;'layout="column">
            <h3>Статус</h3>
            <p ng-if="appointment.status==0">Новий</p>
            <p class="approved-titlt" ng-if="appointment.status==1">Підтвірджено</p>
            <p ng-if="appointment.status==2">Оплачено</p>
            <p ng-if="appointment.status==3">Відмова</p>
        </div>

     
        <div class="md-list-item-text" layout="column">
            <h3>Запис створено</h3>
            <p>{{appointment.creationDate|date:'dd.MM.yyyy'}}</p>
        </div>

        <div class="md-list-item-text" layout="column">
            <h3>Замовник</h3>
            <p>{{::appointment.name||'Анонім'}} {{::appointment.phone||appointment.email||''}}</p>
        </div>
       
        <md-icon class="md-secondary " ng-click="$ctrl.showEditOrderDialog($event, appointment)"
                 md-svg-icon="communication:ic_message_24px">
            <md-tooltip> Деталі</md-tooltip>
        </md-icon>

        <md-icon class="md-secondary " ng-if="::$root.it.can('modifySalon')"
                 ng-click=" ::$root.it.can('modifySalon') && $ctrl.showDeleteDialog($event, appointment)"
                 md-svg-icon="action:ic_delete_24px">
            <md-tooltip >Видалити</md-tooltip>
        </md-icon>

        <md-divider></md-divider>
    </md-list-item>
</md-list>

`;

let editOrderDialogTemplate = `<md-dialog aria-label="Order edit" ng-cloak>
    <form name="orderEditForm" ng-submit="$ctrl.save(orderEditForm)">
        <md-toolbar>
            <div class="md-toolbar-tools">
                <p ng-if="$ctrl.appointment.creationDate">Запис створено
                    {{$ctrl.appointment.creationDate |date:'dd.MM.yyyy'}}</p>
                <span flex></span>
                <md-button class="md-icon-button" ng-click="$ctrl.cancel()">
                    <md-icon md-svg-src="navigation:ic_close_24px" aria-label="Close dialog"></md-icon>
                </md-button>
            </div>

        </md-toolbar>
        <md-dialog-content>
            <md-tabs md-stretch-tabs="always" md-dynamic-height>
                <md-tab flex label="Клієнт">
                    <div  layout="column" class="md-margin">
                        <div layout="row"  layout="start start" >
                            <md-input-container class="md-block">
                            <label>Телфон</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.phone">
                        </md-input-container>

                            <md-input-container class="md-block">
                                <label>Замовник</label>
                                <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                       ng-model="$ctrl.appointment.name">
                            </md-input-container>
                        </div>
                        <div layout="row"  layout="start start" >
                            <md-input-container class="md-block" layout="column"  layout="start start" >
                                <label>Дата прийому</label>
                                <md-datepicker ng-disabled='true'  placeholder="Дата" flex
                                               ng-model="$ctrl.appointment.date"
                                               name="dateField"></md-datepicker>
                            </md-input-container>

                            <md-input-container class="md-block">
                                <md-icon md-svg-icon="action:ic_schedule_24px"></md-icon>
                                <label>Час прийому</label>
                                <input ng-disabled="true" type="text"
                                       ng-model="$ctrl.dayHour"/>
                            </md-input-container>

                        </div>
                        <div layout="row"  layout="start start" >
                            <md-input-container class="md-block" ng-if="$ctrl.appointment.favor">
                                <md-subheader class="md-no-sticky">Послуга</md-subheader>


                                <div layout="row" layout-align="start center  ">
                                    <img ng-src="{{$ctrl.appointment.favor.photo.url}}" class="avatar"
                                         alt="{{$ctrl.appointment.favor.name}}"/>
                                    <div flex layout="column" layout="center">

                                        <div id="prokgram" name="program">
                                            {{::$ctrl.appointment.favor.name}}
                                        </div>
                                        <div id="program" name="program">
                                            {{$ctrl.appointment.favor.defPrice}} грн.
                                        </div>
                                    </div>
                                </div>
                            </md-input-container>
                            <md-input-container class="md-block">
                                <md-checkbox ng-disabled="::!$root.it.can('modifySalon')"
                                             ng-model="$ctrl.appointment.isConsultation">Записатись на консультацію
                                </md-checkbox>
                            </md-input-container>

                        </div>
                        
                        <md-input-container >
                            <label>Коментар замовника</label>
                            <input ng-disabled="::!$root.it.can('modifySalon')" type="text"
                                   ng-model="$ctrl.appointment.comment"/>
                        </md-input-container>
                    </div>

                </md-tab>

                <md-tab flex label="Майстер">
                    <div flex="100"  layout="row" class="md-margin">
                        <div layout="column"  layout="start stretch" flex> 
                            <md-input-container class="md-block">
                            <label>Майстер</label>
                            <md-select ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.master"
                                       ng-change="$ctrl.changeMaster(id)">
                                <md-option ng-repeat="master in $ctrl.masters" ng-value="master._id">
                                    <div layout="row" layout-align=" start center  ">
                                        <img ng-src="{{master.photo.url}}" class="avatar" alt="{{master.name}}"/>
                                        <span> {{ master.name }}   </span></div>
                                </md-option>
                            </md-select>
                        </md-input-container>
                        
                            <md-input-container class="md-block">
                                <md-subheader class="md-no-sticky">Послуги</md-subheader>
                                <div ng-repeat="service in $ctrl.appointment.favors">

                                    <div layout="row" layout-align="start center  ">
                                        <img ng-src="{{service.favor.photo.url}}" class="avatar"
                                             alt="{{service.favor.name}}"/>
                                        <div flex layout="column" layout="center">

                                            <div id="prokgram" name="program">
                                                {{::service.favor.name}}
                                            </div>
                                            <div id="program" name="program">
                                                {{service.price}} грн.
                                            </div>
                                        </div>


                                        <md-button class=" md-padding" ng-if="::$root.it.can('modifySalon')"
                                                   class="md-icon-button"
                                                   ng-click="$ctrl.deleteService(service)">
                                            <md-icon md-svg-src="action:ic_delete_24px"></md-icon>
                                        </md-button>
                                    </div>
                                </div>
                            </md-input-container>

                        </div>
                         <div layout="column"  flex="50" layout="start start" ng-if=" ::$root.it.can('modifySalon') ">
                            <md-subheader class="md-no-sticky" >Додати послугу
                            </md-subheader>

                            <md-select ng-if=" ::$root.it.can('modifySalon') " ng-model="$ctrl.newService"
                                       ng-model-options="{trackBy: '$value.favor._id'}">
                                <md-option ng-repeat="favor in $ctrl.favors" ng-value="favor">
                                    <div layout="row" layout-align=" start center  ">
                                        <img ng-src="{{favor.favor.photo.url}}" class="avatar"
                                             alt="{{favor.favor.name}}"/>
                                        <span>  {{ favor.favor.name }}  </span></div>

                                </md-option>
                            </md-select>
                            <md-input-container ng-if=" ::$root.it.can('modifySalon')" layout="row" class="md-block">
                                <label for="newProgram">ЦІНА</label>
                                <input type="number" ng-model="$ctrl.newService.price"/>

                            </md-input-container>
                            <md-button ng-if=" ::$root.it.can('modifySalon')" ng-disabled="!$ctrl.newService.favor"
                                       class=" " ng-click="$ctrl.addService()">
                                Додати
                            </md-button>
                        </div>
                    </div>
                    
                </md-tab>

                <md-tab flex label="Адмінітратор">
                    <div flex="100"  layout="column" class="md-margin">

                        <md-subheader class="md-no-sticky">Адміністративна частина
                        </md-subheader>
                        <md-input-container>
                            <label>Статас</label>
                            <md-select ng-disabled="::!$root.it.can('modifySalon')" ng-model="$ctrl.appointment.status"
                            >
                                <md-option ng-repeat="status in $ctrl.orderStatuses" ng-value="status._id">
                                    <span>  {{ status.name }}  </span>
                                </md-option>
                            </md-select>
                        </md-input-container>
                        <md-input-container class="md-block">
                            <md-checkbox ng-disabled="::!$root.it.can('modifySalon')"
                                         ng-model="$ctrl.appointment.isPreOrder">Попереднє замовлення
                            </md-checkbox>
                        </md-input-container>
                        <md-input-container>
                            <label>Коментар адміністратора</label>
                            <textarea ng-disabled="::!$root.it.can('modifySalon')"
                                      ng-model="$ctrl.appointment.admin_comment"></textarea>
                        </md-input-container>
                      
                    </div>
                </md-tab>

                <md-tab flex label="Графік" ng-if="::$root.it.can('modifySalon') && $ctrl.appointment.master">
                    <pg-appointment-scheduler appointment="$ctrl.appointment" 
                                              master="$ctrl.appointment.master"></pg-appointment-scheduler>
                </md-tab>
            </md-tabs>
                
        </md-dialog-content>
        <md-dialog-actions layout="row" ng-if="::$root.it.can('modifySalon')">
            <span flex></span>

            <md-button ng-click="$ctrl.cancel()" aria-label="cancel" class="md-raised  md-primary">
                Відмінити
            </md-button>
            <md-button type="submit" aria-label="save" class="md-raised md-primary md-accent">
                Зберегти
            </md-button>
        </md-dialog-actions>
    </form>
</md-dialog>
`;
class EditDialogController {

    static $inject = ['$mdDialog', "$mdToast", 'constants', 'appointment'];
    private masters: IMaster[];
    private favors: any[];
    private newService: IMasterFavor;
    private appointment: IAppointment;
    private originalAppointment: IAppointment;
    dayHour: any;
    private orderStatuses: any;

    constructor(private $mdDialog: ng.material.IDialogService, private $mdToast: ng.material.IToastService,
                private constants: IConstants, appointment: IAppointment) {
        this.appointment = angular.copy(appointment);
        this.originalAppointment = appointment;
        this.masters.forEach((m) => {
            if (m._id === this.appointment.master) {
                this.favors = m.services;
            }
        })
        this.setTime();
        this.orderStatuses = constants.orderStatuses;
    }

    setTime() {
        if (this.appointment.date) {
            this.appointment.date = new Date(this.appointment.date);
            var minutes = this.appointment.date.getMinutes();
            this.dayHour = this.appointment.date.getHours() + ':' + (  (minutes < 10) ? minutes + '0' : minutes);

        }
    }

    deleteService(favor) {
        this.appointment.favors.splice(this.appointment.favors.indexOf(favor), 1)
    }

    addService(favor: IMasterFavor) {

        if (!this.appointment.favors.some((f) => {
                return this.newService._id === f._id;
            })) {
            this.appointment.favors.push(this.newService);
            this.newService = null;
        } else {
            this.$mdToast.showSimple(`Така послуга вже існує`);
        }
    }


    changeMaster(master) {
        if (master != this.appointment.master) {
            this.appointment.favors = [];
            this.masters.forEach((m) => {
                if (m._id === this.appointment.master) {
                    this.favors = m.services;
                    return;
                }
            })
        }
    }

    save($form: ng.IFormController) {
        if ($form.$valid) {
            angular.extend(this.originalAppointment, this.appointment);
            this.$mdDialog.hide(this.originalAppointment);
        }
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}

export class AppointmentsComponentController {

    static $inject = [AppointmentResourceName, PagingServiceName, "$filter", "$mdDialog",
        "$mdToast", MasterResourceName, "$location",'$mdMedia'];
    masters: IMaster[];
    appointments: IAppointment[];
    paging: any;
    private start: Date;
    private end: Date;

    constructor(private AppointmentResource: IAppointmentResource, private pagingService: PagingService,
                private $filter: ng.IFilterService, private $mdDialog: ng.material.IDialogService,
                private $mdToast: ng.material.IToastService, private MasterResource: IMasterResource,
                private $location: ng.ILocationService,private $mdMedia) {
        this.setDefaultDates();
    }

    setDefaultDates() {
        this.end = new Date();
        this.start = new Date();
        this.start.setMonth(this.start.getMonth() - 1);
        this.start.setHours(0, 0, 0)
    }

    Search() {
        this.showPage();
    }

    openTask(masterId: string) {
        this.$location.url('/salon/master/' + masterId);
    }

    $onInit() {
        this.masters = this.MasterResource.query({populate: 'services.favor'});
        this.showPage();
    }

    prev() {
        this.showPage(this.pagingService.prevPage());
    }

    next() {
        this.showPage(this.pagingService.nextPage());
    }

    private showPage(page = 1) {
        this.appointments = this.AppointmentResource.query({
                page: page,
                perPage: 10,
                sort: {"status": 1, "creationDate": -1},
                query: {'creationDate': {"$lte": this.end.toJSON(), "$gte": this.start.toJSON()}},
                populate: '[{"path":"favor"}, {"path":"favors.favor"}]'
               // populate: [{"path":"favors.favor"},{"path":"favor"}]
            },
            (res, headers) => {
                let {total, page, perPage} = this.pagingService.parseHeaders(headers);
                this.pagingService.update({page: page, perPage: perPage, total: total});
                this.paging = angular.copy(this.pagingService.params());
            });
    }

    showEditOrderDialog(ev: MouseEvent, appointment: IAppointment) {

        this.$mdDialog.show({
            template: editOrderDialogTemplate,
            controller: EditDialogController,
            controllerAs: '$ctrl',
            bindToController: true,
            locals: {
                appointment: appointment,
                masters: this.masters
            },
            fullscreen: this.$mdMedia('(max-width: 1360px)'),
            parent: angular.element(document.body),
            targetEvent: ev

        }).then((appointment) => this.saveAppointment(appointment));
    }


    saveAppointment(appointment: IAppointment) {

        appointment.$save().then(() => {
            this.$mdToast.showSimple(`Запис збережено`);
        }).catch((err) => {
            this.showErrorDialog();
        }).finally(() => {
            this.showPage(this.pagingService.currentPage());
        });
        ;
    }

    showDeleteDialog(ev, appointment: IAppointment) {
        let confirm = this.$mdDialog.confirm()
            .title("Підтвердження дії")
            .textContent(`Ви дійсно бажаєте видалити Запис ${appointment.name || ''}?`)
            .ariaLabel("Підтвердження дії")
            .targetEvent(ev)
            .ok('Так')
            .cancel('Ні');

        return this.$mdDialog.show(confirm)
            .then(() => {
                return this.deleteOrder(appointment);
            });
    }

    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title("Помилка")
            .textContent(`Спробуйте будь ласка пізніше`)
            .ariaLabel("Помилка")
            .ok('OK')
        return this.$mdDialog.show(confirm);

    }

    deleteOrder(appointment: IAppointment) {

        appointment.$delete().then(() => {
            this.$mdToast.showSimple(`Замовлення видалено`);
        }).catch((err) => {
            this.$mdToast.showSimple(err.message);
        }).finally(() => {
            this.showPage(this.pagingService.currentPage());
        });
        ;
    }


}

export let AppointmentsComponentUrl = "/salon/appointments";
export let AppointmentsComponentName = 'pgAppointments';
export let AppointmentsComponentOptions = {
    template: template,
    controller: AppointmentsComponentController
};