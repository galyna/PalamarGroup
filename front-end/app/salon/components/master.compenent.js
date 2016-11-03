System.register(["../../resources/master.resource", "../../resources/appointment.resource", "../../ui/mediaObserver.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1, appointment_resource_1, mediaObserver_service_1;
    var template, appointmentTemplate, AppointmentDialogController, MasterComponentController, MasterComponentUrl, MasterComponentName, MasterComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            },
            function (appointment_resource_1_1) {
                appointment_resource_1 = appointment_resource_1_1;
            },
            function (mediaObserver_service_1_1) {
                mediaObserver_service_1 = mediaObserver_service_1_1;
            }],
        execute: function() {
            template = "<div class=\" description-container\">\n\n\n    <div class=\" courses\" layout-align=\"center center\" layout=\"column\"\n    >\n        <div hide show-gt-xs=\"true\" layout=\"row\" layout-align=\"center center\">\n\n            <md-card flex-gt-md=\"70\" flex-md=\"80\" flex-gt-xs=\"85\" md-whiteframe=\"5\"\n            >\n                <md-card-content layout=\"row\" layout-align=\"start none\">\n                    <div class=\"card-media \" data-aos=\"{{{true:'fade-right', false:'false'}[$ctrl.showAnimation]}}\"\n                         data-aos-easing=\"ease-out-cubic\"\n                         flex=\"50\"><img src=\"{{::$ctrl.master.photo.url}}\" class=\"md-card-image \"/>\n                    </div>\n                    <div class=\"card-desc box \" data-aos=\"{{{true:'fade-left', false:'false'}[$ctrl.showAnimation]}}\"\n                         data-aos-easing=\"ease-out-cubic\"\n                         flex=\"50\" layout=\"column\" layout-align=\"space-around center\">\n                            <div ng-if=\"$ctrl.master.rate && $ctrl.master.rate._id!=='0'\" hide show-md=\"true\"\n                                 class=\"corner-ribbon top-right black\"\n                                 ng-class=\"{'grey': $ctrl.master.rate._id==='2','white': $ctrl.master.rate._id==='1'}\">\n                                {{$ctrl.master.rate.text}}\n                            </div>\n                            <div ng-if=\"$ctrl.master.rate && $ctrl.master.rate._id!=='0'\" hide-md=\"true\"\n                                 class=\"corner-ribbon-min top-right black\"\n                                 ng-class=\"{'grey': $ctrl.master.rate._id==='2','white': $ctrl.master.rate._id==='1'}\">\n                                {{$ctrl.master.rate.text}}\n                            </div>\n                            <div layout=\"row\" layout-align=\"center center\" class=\"md-padding md-margin\">\n                                <div hide show-gt-sm=\"true\" flex=\"90\" class=\"md-display-2\">{{::$ctrl.master.name}}</div>\n                                <div hide show-sm=\"true\"\n                                =\"true\" flex=\"90\" class=\"md-display-1\">{{::$ctrl.master.name}}\n                            </div>\n                        </div>   \n                         <div  ng-if=\"$ctrl.master.description\"  hide  show-gt-sm=\"true\" layout=\"row\" layout-align=\"center center\" class=\"\">\n                                <md-card-title>\n                            <md-card-title-text>\n                               \n                                <div class=\"md-title\">{{::$ctrl.master.description}}</div>\n                            </md-card-title-text>\n                        </md-card-title>\n                        </div>   \n                                                                                                                                \n                        <md-button class=\" near-master xs-selected md-display-1 md-raised \" aria-label=\"Details\"\n                                   ng-click=\"$ctrl.showAppointmentDialog($ctrl.master)\">\n                            \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044C\n                        </md-button>\n\n            </div>\n                </md-card-content>\n            </md-card>\n        </div>\n        <div hide-gt-xs=\"true\" layout=\"row\" layout-align=\"center center\">\n\n            <md-card md-whiteframe=\"8\">\n                <md-card-content layout=\"column\">\n                    <div ng-if=\"$ctrl.master.rate && $ctrl.master.rate._id!=='0'\" class=\"card-desc-top-master\"\n                 ng-class=\"{'grey': $ctrl.master.rate._id==='2','white': $ctrl.master.rate._id==='1'}\" flex\n                 layout=\"column\"\n                 layout-align=\" space-around center\">\n                <md-card-title>\n                    <md-card-title-text flex layout=\"column\" layout-align=\" space-around center\">\n                        <div class=\"md-headline\"> {{::$ctrl.master.rate.text}}</div>\n                    </md-card-title-text>\n                </md-card-title>\n            </div>\n                    <div class=\"card-media \" ng-click=\"$ctrl.showMaster($ctrl.master._id)\">\n                        <img\n                                src=\"{{::$ctrl.master.photo.url}}\"\n                                class=\"md-card-image\"/></div>\n                    <div class=\"card-desc \"\n                         layout=\"column\" layout-align=\"center center\">\n                        <md-card-title>\n                            <md-card-title-text>\n                                <div class=\"md-headline\">{{::$ctrl.master.name}}</div>\n                                <div class=\"md-title\">{{::$ctrl.master.description}}</div>\n                            </md-card-title-text>\n                        </md-card-title>\n\n                        <md-button class=\"xs-selected md-display-1 md-raised  \" aria-label=\"Details\"\n                                   ng-click=\"$ctrl.showAppointmentDialog(product)\">\n                            \u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044C\n                        </md-button>\n                    </div>\n                </md-card-content>\n\n            </md-card>\n\n        </div>\n    </div>\n    \n   \n    <div flex layout-align=\"center center\" layout=\"row\">\n        <div class=\"page-delimiter\" flex>\n            <div class=\"fit-screen-wrap invers header\">\n                <div class=\"md-display-1\"> \u0413\u0420\u0410\u0424\u0406\u041A \u0420\u041E\u0411\u041E\u0422\u0418</div>\n                <div class=\"md-subhead md-padding\"> \u0432\u0438\u0431\u0435\u0440\u0438 \u0447\u0430\u0441 \u0449\u043E\u0431 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044C</div>\n            </div>\n\n        </div>\n    </div>\n\n    <div class=\"master-scheduler\" layout=\"row\" flex layout-align=\"center center\">\n        <div flex flex-gt-md=\"70\" flex-md=\"80\" flex-gt-xs=\"85\">\n            <div layout=\"row\" layout-xs=\"column\" class='master-calendar'>\n                <div hide show-gt-xs=\"true\" class=\"md-padding \" layout=\"row\" layout-align=\"center center\">\n                    <daypilot-navigator style=\" width: 280px\" id=\"navi-front\"\n                                        daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n\n                </div>\n                <div hide-gt-xs=\"true\" class=\"md-padding \" layout=\"row\" layout-align=\"center center\">\n\n                    <daypilot-navigator style=\" width: 280px\" id=\"navis\"\n                                        daypilot-config=\"$ctrl.navigatorSmallConfig\"></daypilot-navigator>\n                </div>\n                <div flex class=\"md-padding \">\n                    <daypilot-calendar id=\"week-front\" daypilot-config=\"$ctrl.weekConfig\"\n                                       daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n                </div>\n\n            </div>\n        </div>\n\n    </div>\n\n\n    <div flex layout-align=\"center center\" layout=\"row\"\n         ng-if=\"$ctrl.master.videos.length>0 || $ctrl.master.works.length>0\">\n        <div class=\"page-delimiter\" flex>\n            <div class=\"fit-screen-wrap invers header\">\n                <div class=\"md-display-2\"> \u0420\u041E\u0411\u041E\u0422\u0418 \u041C\u0410\u0419\u0421\u0422\u0420\u0410</div>\n            </div>\n\n        </div>\n    </div>\n\n\n    <div class=\"courses-details\" layout=\"row\" flex layout-align=\"center center\" ng-if=\"$ctrl.master.videos.length>0\">\n        <div flex flex-gt-md=\"70\" flex-md=\"80\" flex-gt-xs=\"85\">\n            <div layout=\"column\" layout-margin layout layout-wrap layout-align=\"center center\">\n                <md-card md-whiteframe=\"6\" class=\"  courses-videos\"\n                         data-aos=\"{{{true:'zoom-in-up', false:''}[$ctrl.showAnimation]}}\"\n                         ng-repeat=\"video in $ctrl.master.videos track by $index\"\n                         flex>\n                    <div flex class=\"embed-responsive embed-responsive-16by9\">\n                        <youtube-video class=\"embed-responsive-item\" player-vars=\"{showinfo: 0}\"\n                                       video-id=\"video.url\"></youtube-video>\n                    </div>\n                    <md-card-content ng-if=\"video.name\" layout=\"column\" flex=\"100\" layout-align=\"center center\">\n                        <span class=\"  md-margin\">{{::video.name}}</span>\n                    </md-card-content>\n                </md-card>\n            </div>\n        </div>\n\n    </div>\n\n    <div flex=\"100\" class=\"courses-details\" layout=\"row\" layout-align=\"center center\"\n         ng-if=\"$ctrl.master.works.length>0 \">\n        <div flex flex-gt-md=\"70\" flex-md=\"80\" flex-gt-xs=\"85\">\n            <div class=\"courses-hear-forms\" layout-margin layout layout-wrap layout-align=\"center center\">\n                <md-card md-whiteframe=\"6\" data-aos=\"zoom-in-up\" ng-repeat=\"photo in $ctrl.master.works\"\n                         class=\"md-margin \"\n                         ng-attr-flex-gt-sm=\"{{$ctrl.getPictureFlex($index,$ctrl.master.works.length)}}\"\n                         flex-gt-xs=\"46\" flex-xs=\"80\"\n                         ng-click=\"::$ctrl.showMediaObserver($ctrl.master.works, $index)\">                   \n                        <img ng-src=\"{{::photo.url}}\" class=\"md-card-image\">                 \n                    <md-card-content ng-if=\"photo.name\" layout=\"column\" flex=\"100\" layout-align=\"center center\">\n                        <span class=\"  md-margin\">{{::photo.name}}</span>\n                    </md-card-content>\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n";
            appointmentTemplate = "<md-dialog class=\"pop-form-dialog\" aria-label=\"\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C \u041D\u0410 \u0411\u041B\u041E\u041A\" flex-sm=\"85\" flex-xs=\"95\" flex-gt-sm=\"65\"\n           layout=\"column\">\n    <md-toolbar class=\"md-hue-2\">\n        <div class=\"md-toolbar-tools md-padding \">\n            <h2 class=\" md-padding \">\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C \u041D\u0410 \u041F\u0420\u0418\u0419\u041E\u041C</h2>\n            <span flex></span>\n            <md-button class=\"md-icon-button\" ng-click=\"vm.cancel()\">\n                <md-icon md-svg-src=\"navigation:ic_cancel_24px\" aria-label=\"Close dialog\"></md-icon>\n            </md-button>\n        </div>\n    </md-toolbar>\n    <form name=\"orderForm\" class=\"md-padding pop-form\" novalidate flex ng-submit=\"vm.save(orderForm)\">\n        <md-dialog-content>\n            <md-dialog-content-body>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"social:ic_person_24px\"></md-icon>\n                    <label for=\"name\">\u042F\u043A \u0434\u043E \u0432\u0430\u0441 \u0437\u0432\u0435\u0440\u0442\u0430\u0442\u0438\u0441\u044C?</label>\n                    <input id=\"name\" ng-model=\"vm.appointment.name\" type=\"text\" name=\"name\" required>\n                     <div ng-messages=\"orderForm.name.$error\" role=\"alert\"\n                         ng-show=\"orderForm.$submitted && orderForm.name.$invalid\" >\n                        <div class=\"md-headline\" ng-message=\"required\">\n                             \u0417\u0430\u043B\u0438\u0448\u0442\u0435 \u0445\u043E\u0447 \u044F\u043A\u0443\u0441\u044C \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044E \u043F\u0440\u043E \u0441\u0435\u0431\u0435, \u0431\u0430\u0436\u0430\u043D\u043E \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443\n                        </div>\n                    </div>\n                </md-input-container>\n                <md-input-container class=\"md-block reduce-bottom-margin\">\n                    <md-icon md-svg-icon=\"communication:ic_call_24px\"></md-icon>\n                    <label for=\"phone\">\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n                    <input id=\"phone\" ng-model=\"vm.appointment.phone\" type=\"text\" name=\"phone\">\n                </md-input-container>\n                <div flex=\"100\" layout=\"row\" layout-xs=\"columm\">\n                    <div flex=\"50\" flex-xs=\"100\" class=\"order-picker-container \" layout=\"row\">\n                        <md-datepicker class=\"order-date-picker\" placeholder=\"\u0414\u0430\u0442\u0430\" flex ng-model=\"vm.appointment.date\"\n                                       name=\"dateField\"></md-datepicker>\n                    </div>\n                    <md-input-container flex=\"50\" flex-xs=\"100\">\n                        <md-icon md-svg-icon=\"action:ic_schedule_24px\"></md-icon>\n                   \n                        <md-select ng-model=\"vm.dayHour\" ng-model-options=\"{trackBy: '$value.id'}\">\n                            <md-option ng-repeat=\"hour in vm.dayHours\" ng-value=\"hour\">\n                                {{ hour.value }}\n                            </md-option>\n                        </md-select>\n                    </md-input-container>\n                </div>\n                <md-input-container class=\"md-block \">\n                    <label for=\"service\">\u041F\u043E\u0441\u043B\u0443\u0433\u0430</label>\n                    <md-select ng-model=\"vm.appointment.service\"\n                               ng-model-options=\"{trackBy: '$value._id'}\">\n                        <md-option ng-repeat=\"service in vm.appointment.master.services\" ng-value=\"service\">\n                            <div layout=\"row\" layout-align=\" start center  \">\n                                <img ng-src=\"{{service.favor.photo.url}}\" class=\"avatar\" alt=\"{{service.favor.name}}\"/>\n                                <span>  {{ service.favor.name }}  </span></div>\n                        </md-option>\n                        </md-option>\n                    </md-select>\n                </md-input-container>\n                <md-input-container class=\"md-block\">\n                    <md-icon md-svg-icon=\"communication:ic_chat_24px\"></md-icon>\n                    <label for=\"comment\">\u0414\u043E\u0434\u0430\u0442\u043A\u043E\u0432\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F</label>\n                    <textarea id=\"comment\" ng-model=\"vm.appointment.comment\" name=\"comment\"></textarea>\n                </md-input-container>\n                <p class=\" md-headline\">\u041F\u0456\u0441\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0443 \u0437 \u0412\u0430\u043C\u0438 \u0437\u0432\u044F\u0436\u0435\u0442\u044C\u0441\u044F \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0434\u043B\u044F \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F</p>\n            </md-dialog-content-body>\n        </md-dialog-content>\n        <md-dialog-actions class=\"md-padding\" layout=\"row\" layout-align-xs=\"center center\">\n            <md-button type=\"submit\" class=\" xs-selected md-raised md-headline\">\u0417\u0410\u041F\u0418\u0421\u0410\u0422\u0418\u0421\u042C</md-button>\n        </md-dialog-actions>\n    </form>\n</md-dialog>\n";
            AppointmentDialogController = (function () {
                function AppointmentDialogController($mdDialog, appointment) {
                    this.$mdDialog = $mdDialog;
                    this.dayHours = [{ id: 1, value: '10:00' }, { id: 2, value: '10:30' }, { id: 3, value: '11:00' }, { id: 4, value: '11:30' },
                        { id: 5, value: '12:00' }, { id: 6, value: '12:30' }, { id: 7, value: '13:00' }, { id: 8, value: '13:30' }, {
                            id: 9,
                            value: '14:00'
                        },
                        { id: 10, value: '14:30' }, { id: 11, value: '15:00' }, { id: 12, value: '15:30' }, { id: 13, value: '16:00' }, {
                            id: 14,
                            value: '16:30'
                        },
                        { id: 15, value: '17:00' }, { id: 16, value: '17:30' }, { id: 17, value: '18:00' }, { id: 18, value: '18:30' }];
                    this.appointment = angular.copy(appointment);
                    this.originalAppointment = appointment;
                    this.setTime();
                }
                AppointmentDialogController.prototype.setTime = function () {
                    var _this = this;
                    if (this.appointment.date) {
                        var minutes = this.appointment.date.getUTCMinutes();
                        var hourValue = this.appointment.date.getUTCHours() + ':' + ((minutes < 10) ? minutes + '0' : minutes);
                        this.dayHours.forEach(function (hour) {
                            if (hour.value === hourValue) {
                                _this.dayHour = hour;
                            }
                        });
                    }
                };
                AppointmentDialogController.prototype.save = function (orderForm) {
                    if (this.appointment.name || this.appointment.comment || this.appointment.phone) {
                        if (this.dayHour && this.appointment.date) {
                            var time = this.dayHour.value.split(':');
                            this.appointment.date.setHours(time[0]);
                            this.appointment.date.setMinutes(time[1]);
                            this.dayHour = null;
                        }
                        angular.extend(this.originalAppointment, this.appointment);
                        this.$mdDialog.hide(this.originalAppointment);
                    }
                };
                AppointmentDialogController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                AppointmentDialogController.$inject = ['$mdDialog', 'appointment'];
                return AppointmentDialogController;
            }());
            MasterComponentController = (function () {
                function MasterComponentController($log, $routeParams, MasterResource, mdDialog, $rootScope, AppointmentResource, mediaObserver, constants) {
                    var _this = this;
                    this.$log = $log;
                    this.$routeParams = $routeParams;
                    this.MasterResource = MasterResource;
                    this.mdDialog = mdDialog;
                    this.$rootScope = $rootScope;
                    this.AppointmentResource = AppointmentResource;
                    this.mediaObserver = mediaObserver;
                    this.constants = constants;
                    this.events = [];
                    this.appointment = new this.AppointmentResource();
                    if (this.$routeParams["id"]) {
                        this.MasterResource.get({ id: this.$routeParams["id"], populate: 'services.favor' }).$promise
                            .then(function (master) {
                            _this.master = master;
                        }).catch(function (err) {
                            _this.$log.error(err);
                        });
                        this.loadEvents(new Date(), this.$routeParams["id"]);
                    }
                }
                MasterComponentController.prototype.getStartAndEndOfWeek = function (date) {
                    date = new Date(date);
                    date.setUTCHours(0);
                    var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
                    var start = new Date(date.setDate(diff));
                    var end = new Date(date.setDate(start.getDate() + 7));
                    return [start, end];
                };
                MasterComponentController.prototype.loadEvents = function (start, masterId) {
                    var _this = this;
                    var days = this.getStartAndEndOfWeek(start);
                    var params = {
                        id: masterId,
                        start: days[0].toISOString(),
                        end: days[1].toISOString(),
                    };
                    this.MasterResource.getTasks(params).$promise.then(function (tasks) {
                        _this.initWeekConfig();
                        _this.initNavigatorConfig();
                        _this.initNavigatorSmallConfig();
                        _this.iniOnTimeRangeSelect();
                        _this.events = tasks.map(function (task) {
                            _this.updateTaskText(task);
                            return angular.copy(task.scheduler);
                        });
                    }).catch(function (err) {
                        _this.$log.error(err);
                    });
                };
                MasterComponentController.prototype.updateTaskText = function (task) {
                    task.scheduler.borderColor = "gray";
                    task.scheduler.barColor = "gray";
                    task.scheduler.text = "<div><span>\u0417\u0430\u043F\u0438\u0441</span></div>";
                };
                MasterComponentController.prototype.initNavigatorSmallConfig = function () {
                    var _this = this;
                    this.navigatorSmallConfig = {
                        selectMode: "week",
                        showMonths: 1,
                        skipMonths: 1,
                        locale: "ru-ru",
                        cellHeight: "40",
                        cellWidth: "40",
                        onTimeRangeSelected: function (args) {
                            _this.weekConfig.startDate = args.day;
                            _this.loadEvents(args.day, _this.master._id);
                        }
                    };
                };
                MasterComponentController.prototype.initNavigatorConfig = function () {
                    var _this = this;
                    this.navigatorConfig = {
                        selectMode: "week",
                        showMonths: 3,
                        skipMonths: 3,
                        locale: "ru-ru",
                        cellHeight: "34.5",
                        cellWidth: "30",
                        onTimeRangeSelected: function (args) {
                            _this.weekConfig.startDate = args.day;
                            _this.loadEvents(args.day, _this.master._id);
                        }
                    };
                };
                MasterComponentController.prototype.initWeekConfig = function () {
                    this.weekConfig = {
                        visible: true,
                        viewType: "Week",
                        angularAutoApply: true,
                        locale: "ru-ru",
                        businessBeginsHour: "10",
                        businessEndsHour: "19",
                        headerDateFormat: 'dd.MM',
                        cellHeight: "40",
                        durationBarVisible: "false",
                        columnMarginRight: "0",
                        hideUntilInit: true,
                        eventMoveHandling: 'Disabled',
                        eventResizeHandling: 'Disabled',
                    };
                };
                MasterComponentController.prototype.iniOnTimeRangeSelect = function () {
                    var _this = this;
                    this.weekConfig.eventResizeHandling = 'Update';
                    this.weekConfig.onTimeRangeSelected = function (args) {
                        _this.appointment.date = new Date(args.start.toString()),
                            _this.showAppointmentDialog();
                    };
                };
                MasterComponentController.prototype.setSocialParams = function (photo) {
                    this.$rootScope.socialParams.host = this.constants.host;
                    this.$rootScope.socialParams.target = this.constants.host + "/#master" + this.master._id;
                    this.$rootScope.socialParams.image = this.constants.host + photo.url;
                    this.$rootScope.socialParams.title = "Робота майстра " + this.master.name;
                    this.socialParams = angular.copy(this.$rootScope.socialParams, this.socialParams);
                };
                MasterComponentController.prototype.getPictureFlex = function (index, length) {
                    if (length > 3 && (length % 3 == 1 && index >= length - 4) || (length % 3 == 2 && index >= length - 5)) {
                        return 46;
                    }
                    else {
                        return 22;
                    }
                };
                MasterComponentController.prototype.showMediaObserver = function (items, index) {
                    this.setSocialParams(items[index]);
                    this.mediaObserver.observe(items, index, this.socialParams);
                };
                MasterComponentController.prototype.showAppointmentDialog = function () {
                    var _this = this;
                    this.appointment.master = this.master;
                    this.mdDialog.show({
                        template: appointmentTemplate,
                        clickOutsideToClose: true,
                        bindToController: true,
                        controller: AppointmentDialogController,
                        controllerAs: 'vm',
                        parent: angular.element(document.body),
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
                    if (this.appointment.service) {
                        this.appointment.favors = [];
                        this.appointment.favors.push(this.appointment.service);
                    }
                    this.appointment.creationDate = new Date().toJSON();
                    this.appointment.date = new Date(this.appointment.date).toJSON();
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
                        .title('Вашу запис прийнято. ')
                        .textContent('З вами зв`яжеться адміністратор для підтвердження. Дякуємо.')
                        .ariaLabel('Вашу заявку прийнято. ')
                        .ok('Закрити'));
                };
                MasterComponentController.$inject = ["$log", "$routeParams", master_resource_1.MasterResourceName, '$mdDialog', '$rootScope', appointment_resource_1.AppointmentResourceName,
                    mediaObserver_service_1.MediaObserverFactoryName, 'constants'];
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