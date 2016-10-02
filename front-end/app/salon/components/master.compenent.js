System.register(["../../resources/master.resource", "../../resources/appointment.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1, appointment_resource_1;
    var template, appointmentTemplate, AppointmentDialogController, MasterComponentController, MasterComponentUrl, MasterComponentName, MasterComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            },
            function (appointment_resource_1_1) {
                appointment_resource_1 = appointment_resource_1_1;
            }],
        execute: function() {
            template = "\n\n<div class=\"courses-details description-container\" layout=\"column\">\n\n    <!--author-->\n    <div layout=\"row\" class=\"top-info\" flex layout-align=\"center center\">\n        <md-card flex-md=\"90\"  flex-gt-md=\"60\"  flex-xs=\"none\" flex md-whiteframe=\"5\">\n            <md-card-content layuot=\"column\" layout-gt-sm=\"row\">\n               \n                <div class=\" card-media\" layout=\"column\" data-aos=\"{{{true:'fade-right', false:''}[$ctrl.showAnimation]}}\"   data-aos-easing=\"ease-out-cubic\"\n                     flex-gt-sm=\"50\" layout-align=\"center center\">\n                    <img src=\"{{$ctrl.master.photo.url}}\"/>\n                    <div class=\"md-padding author-name\" layout=\"column\" layout-align=\"space-around center\">\n                        <div class=\"md-headline\">\u041C\u0430\u0439\u0441\u0442\u0435\u0440</div>\n                        <div class=\"md-headline\">{{ ::$ctrl.master.name}}</div>\n                    </div>\n                </div>\n                <div  class=\"card-desc \"  data-aos=\"{{{true:'fade-left', false:''}[$ctrl.showAnimation]}}\"  data-aos-easing=\"ease-out-cubic\" flex-gt-sm=\"50\"\n                     layout=\"column\" layout-align=\" space-between center\">\n                    <md-card-title layout=\"column\" layout-align=\"space-around center\">\n                        <md-card-title-text hide show-gt-sm=\"true\" flex layout=\"column\"\n                                            layout-align=\" space-around center\">                       \n                        </md-card-title-text>\n                    </md-card-title>\n                    <div flex layuot=\"column\" layout-align=\"space-between stretch\">\n                        <md-button class=\" md-raised xs-selected \" aria-label=\"Play\"\n                                   ng-click=\"$ctrl.showAppointmentDialog($event)\">\n                            \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044C\n                        </md-button>                    \n                    </div>\n                </div>\n            </md-card-content>\n        </md-card>\n\n    </div>\n\n\n\n\n    \n\n</div>\n\n\n";
            appointmentTemplate = "\n<md-dialog class=\"pop-form-dialog\"  aria-label=\"\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C \u041D\u0410 \u0411\u041B\u041E\u041A\" flex-sm=\"85\" flex-xs=\"95\" flex-gt-sm=\"65\"  layout=\"column\" >\n    <md-toolbar class=\"md-hue-2\">\n        <div class=\"md-toolbar-tools md-padding \">\n            <h2 class=\" md-padding \">\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C \u041D\u0410 \u0411\u041B\u041E\u041A</h2>\n            <span flex></span>\n            <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\n                <md-icon md-svg-src=\"navigation:ic_cancel_24px\" aria-label=\"Close dialog\"></md-icon>\n            </md-button>\n        </div>\n    </md-toolbar>\n    <form name=\"orderForm\" class=\"md-padding pop-form\" novalidate flex>\n        <md-dialog-content>\n            <md-dialog-content-body>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"social:ic_person_24px\"></md-icon>\n                    <label for=\"name\">\u042F\u043A \u0434\u043E \u0432\u0430\u0441 \u0437\u0432\u0435\u0440\u0442\u0430\u0442\u0438\u0441\u044F</label>\n                    <input id=\"name\" ng-model=\"vm.appointment.name\" type=\"text\" name=\"name\">\n                </md-input-container>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"communication:ic_email_24px\"></md-icon>\n                    <label for=\"email\">email</label>\n                    <input id=\"email\" ng-model=\"vm.appointment.email\" type=\"text\" name=\"email\">\n                </md-input-container>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"communication:ic_call_24px\"></md-icon>\n                    <label for=\"phone\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n                    <input id=\"phone\" ng-model=\"vm.appointment.phone\" type=\"text\" name=\"phone\">\n                </md-input-container>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"communication:ic_chat_24px\"></md-icon>\n                    <label for=\"comment\">\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F</label>\n                    <textarea  id=\"comment\" ng-model=\"vm.appointment.comment\"  name=\"comment\"></textarea>\n                </md-input-container>\n                    <p class=\" md-headline\">\u041F\u0456\u0441\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0443 \u0437 \u0412\u0430\u043C\u0438 \u0437\u0432\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0434\u043B\u044F \u0443\u0437\u0433\u043E\u0434\u0436\u0435\u043D\u043D\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439</p>\n            </md-dialog-content-body>\n        </md-dialog-content>\n        <md-dialog-actions class=\"md-padding\" layout=\"row\" layout-align-xs=\"center center\" >\n            <md-button ng-click=\"vm.save(orderForm)\" class=\" xs-selected md-raised md-headline\">\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C</md-button>\n        </md-dialog-actions>\n    </form>\n</md-dialog>\n";
            AppointmentDialogController = (function () {
                function AppointmentDialogController($mdDialog, appointment) {
                    this.$mdDialog = $mdDialog;
                    this.appointment = angular.copy(appointment);
                    this.originalAppointment = appointment;
                }
                AppointmentDialogController.prototype.save = function (orderForm) {
                    angular.extend(this.originalAppointment, this.appointment);
                    this.$mdDialog.hide(this.originalAppointment);
                };
                AppointmentDialogController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                AppointmentDialogController.$inject = ['$mdDialog', 'appointment'];
                return AppointmentDialogController;
            }());
            MasterComponentController = (function () {
                function MasterComponentController($log, $routeParams, MasterResource, mdDialog, $rootScope, AppointmentResource) {
                    var _this = this;
                    this.$log = $log;
                    this.$routeParams = $routeParams;
                    this.MasterResource = MasterResource;
                    this.mdDialog = mdDialog;
                    this.$rootScope = $rootScope;
                    this.AppointmentResource = AppointmentResource;
                    this.appointment = new this.AppointmentResource();
                    if (this.$routeParams["id"]) {
                        this.MasterResource.get({ id: this.$routeParams["id"], populate: 'services.favor' }).$promise
                            .then(function (master) {
                            _this.master = master;
                        }).catch(function (err) {
                            _this.$log.error(err);
                        });
                    }
                }
                MasterComponentController.prototype.showAppointmentDialog = function (event) {
                    var _this = this;
                    this.mdDialog.show({
                        template: appointmentTemplate,
                        clickOutsideToClose: true,
                        bindToController: true,
                        controller: AppointmentDialogController,
                        controllerAs: 'vm',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        locals: {
                            appointment: this.appointment,
                        },
                    }).then(function (result) {
                        _this.handleDialogResult(result);
                    });
                    ;
                };
                MasterComponentController.prototype.handleDialogResult = function (result) {
                    var _this = this;
                    this.$rootScope.loading = true;
                    this.appointment.master = this.master;
                    this.appointment.favors = this.master.services;
                    this.appointment.date = new Date().toJSON();
                    this.appointment.$save()
                        .then(function () {
                        _this.mdDialog.hide();
                        _this.showOrderConfirm();
                    })
                        .catch(function (err) {
                        _this.$log.error(err);
                    })
                        .finally(function () {
                        _this.appointment = new _this.AppointmentResource();
                        _this.$rootScope.loading = false;
                    });
                };
                MasterComponentController.prototype.showOrderConfirm = function () {
                    this.mdDialog.show(this.mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Вашу заявку прийнято. ')
                        .textContent('На протязі дня з вами зв`яжеться адміністратор. Дякуємо.')
                        .ariaLabel('Вашу заявку прийнято. ')
                        .ok('Закрити'));
                };
                MasterComponentController.$inject = ["$log", "$routeParams", master_resource_1.MasterResourceName, '$mdDialog', '$routeParams', appointment_resource_1.AppointmentResourceName];
                return MasterComponentController;
            }());
            exports_1("MasterComponentController", MasterComponentController);
            exports_1("MasterComponentUrl", MasterComponentUrl = "/master/:id");
            exports_1("MasterComponentName", MasterComponentName = 'pgMaster');
            exports_1("MasterComponentOptions", MasterComponentOptions = {
                template: template,
                controller: MasterComponentController
            });
        }
    }
});
//# sourceMappingURL=master.compenent.js.map