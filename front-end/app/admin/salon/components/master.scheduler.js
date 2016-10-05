System.register(["../../../resources/master.resource", "../../../resources/appointment.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1, appointment_resource_1;
    var template, editOrderDialogTemplate, EditDialogController, MasterSchedulerComponentController, MasterSchedulerComponentName, MasterSchedulerComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            },
            function (appointment_resource_1_1) {
                appointment_resource_1 = appointment_resource_1_1;
            }],
        execute: function() {
            template = "<md-list flex ng-if=\"$ctrl.photo\">\n    <md-list-item class=\"md-1-line\">\n        <img ng-src=\"{{$ctrl.photo}}\" class=\"md-avatar\" alt=\"{{$ctrl.photo}}\"/>\n        <div class=\"md-list-item-text\" layout=\"column\">\n            <h3>{{::$ctrl.mname}}</h3>\n        </div>\n    </md-list-item>\n</md-list>\n<div layout=\"row\" layout-xs=\"column\">\n    <div class=\"md-padding \">\n        <daypilot-navigator style=\" width: 280px\" id=\"navi\"\n                            daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n    </div>\n    <div flex class=\"md-padding \">\n        <daypilot-calendar id=\"week\" daypilot-config=\"$ctrl.weekConfig\"\n                           daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n    </div>\n\n</div>";
            editOrderDialogTemplate = "<md-dialog aria-label=\"Order edit\" ng-cloak>\n  \n        <md-toolbar>\n            <div class=\"md-toolbar-tools\">\n                <h2 >\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0430 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F</h2>\n                <span flex></span>\n                <md-button class=\"md-icon-button\" ng-click=\"$ctrl.cancel()\">\n                    <md-icon md-svg-src=\"navigation:ic_close_24px\" aria-label=\"Close dialog\"></md-icon>\n                </md-button>\n            </div>\n            \n        </md-toolbar>\n        <md-dialog-content>\n            <div class=\"md-dialog-content\" layout=\"row\">       \n                  <div  layout-gt-sm=\"row\" layout=\"column\">\n                    <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\" class=\"md-margin\">\n                        <md-subheader class=\"md-no-sticky\">\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0432\u0456\u0434 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430\n                        </md-subheader>\n                        <md-input-container class=\"md-block\">\n                            <label>\u0417\u0430\u043C\u043E\u0432\u043D\u0438\u043A</label>\n                            <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                                   ng-model=\"$ctrl.appointment.name\">\n                        </md-input-container>\n                        <md-input-container class=\"md-block\">\n                            <label>\u0422\u0435\u043B\u0444\u043E\u043D</label>\n                            <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                                   ng-model=\"$ctrl.appointment.phone\">\n                        </md-input-container>\n                        <md-input-container class=\"md-block\">\n                            <label>Email</label>\n                            <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                                   ng-model=\"$ctrl.appointment.email\">\n                        </md-input-container>\n                        <md-input-container class=\"md-block\">\n                            <label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430</label>\n                            <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                                   ng-model=\"$ctrl.appointment.comment\"/>\n                        </md-input-container>\n                    </div>\n                    <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\" class=\"md-margin\">\n                        <md-subheader class=\"md-no-sticky\">\u041C\u0430\u0439\u0441\u0442\u0435\u0440 \u0442\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0438\n                        </md-subheader>\n\n                        <md-input-container class=\"md-block\">\n                            <label>\u041C\u0430\u0439\u0441\u0442\u0435\u0440</label>\n                            <md-select ng-model=\"$ctrl.appointment.master\" ng-change=\"$ctrl.changeMaster(id)\">\n                                <md-option ng-repeat=\"master in $ctrl.masters\" ng-value=\"master._id\">\n                                    {{ master.name }}\n                                </md-option>\n                            </md-select>\n                        </md-input-container>\n\n                        <md-input-container class=\"md-block\">\n                            <md-subheader class=\"md-no-sticky\">\u041F\u043E\u0441\u043B\u0443\u0433\u0438</md-subheader>\n                            <div ng-repeat=\"service in $ctrl.appointment.favors\">\n\n                                <div layout=\"row\">\n                                    <div class=\"md-margin md-padding \" id=\"prokgram\" name=\"program\">\n                                        {{service.favor.name}}\n                                    </div>\n                                    <div class=\"md-margin md-padding \" id=\"program\" name=\"program\">{{service.price}}\n                                    </div>\n                                    <md-button ng-if=\"::$root.it.can('modifySalon')\" class=\"md-icon-button\"\n                                               ng-click=\"$ctrl.deleteService(service)\">\n                                        <md-icon md-svg-src=\"action:ic_delete_24px\"></md-icon>\n                                    </md-button>\n                                </div>\n                            </div>\n                        </md-input-container>\n\n\n                        <md-subheader class=\"md-no-sticky\">\u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u043E\u0441\u043B\u0443\u0433\u0443\n                        </md-subheader>\n\n                        <md-select ng-model=\"$ctrl.newService\" ng-model-options=\"{trackBy: '$value.favor._id'}\">\n                            <md-option ng-repeat=\"favor in $ctrl.favors\" ng-value=\"favor\">\n                                {{ favor.favor.name }}\n                            </md-option>\n                        </md-select>\n                        <md-input-container layout=\"row\" class=\"md-block\">\n                            <label for=\"newProgram\">\u0426\u0406\u041D\u0410</label>\n                            <input type=\"number\" ng-model=\"$ctrl.newService.price\"/>\n\n                        </md-input-container>\n                        <md-button ng-disabled=\"!$ctrl.newService.favor\" class=\" \" ng-click=\"$ctrl.addService()\">\n                            \u0414\u043E\u0434\u0430\u0442\u0438\n                        </md-button>\n\n                    </div>\n                    <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\" class=\"md-margin\">\n\n                        <md-subheader class=\"md-no-sticky\">\u0410\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u0430 \u0447\u0430\u0441\u0442\u0438\u043D\u0430\n                        </md-subheader>\n                        <md-input-container layout=\"row\" class=\"md-block\">\n                            <md-checkbox ng-disabled=\"::!$root.it.can('modifySalon')\" ng-model=\"$ctrl.appointment.answered\">\n                                \u0417\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0443 \u043F\u0435\u0440\u0435\u0434\u0437\u0432\u043E\u043D\u0438\u043B\u0438\n                            </md-checkbox>\n                        </md-input-container>\n                        <md-input-container layout=\"row\" class=\"md-block\">\n                            <md-checkbox ng-disabled=\"::!$root.it.can('modifySalon')\" ng-model=\"$ctrl.appointment.booked\">\n                                \u0423\u0447\u0430\u0441\u0442\u044C \u0443 \u0437\u0430\u0445\u043E\u0434\u0456 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E\n                            </md-checkbox>\n                        </md-input-container>\n\n                        <md-input-container>\n                            <label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430</label>\n                            <textarea ng-disabled=\"::!$root.it.can('modifySalon')\"\n                                      ng-model=\"$ctrl.appointment.admin_comment\"></textarea>\n                        </md-input-container>\n\n                       \n\n                    </div>\n                </div>\n            </div>\n        </md-dialog-content>\n        <md-dialog-actions layout=\"row\" ng-if=\"::$root.it.can('modifySalon')\">\n         <span flex></span>\n         \n                        <md-button ng-click=\"$ctrl.deleteEvent()\" aria-label=\"cancel\">\n                \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n            </md-button>\n                        <md-button ng-click=\"$ctrl.save()\" aria-label=\"save\">\n                \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438\n            </md-button>\n           \n            <md-button ng-click=\"$ctrl.cancel()\" aria-label=\"cancel\">\n                \u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438\n            </md-button>\n\n        </md-dialog-actions>\n\n</md-dialog>\n";
            EditDialogController = (function () {
                function EditDialogController($mdDialog, AppointmentResource, task) {
                    var _this = this;
                    this.$mdDialog = $mdDialog;
                    this.AppointmentResource = AppointmentResource;
                    this.appointment = this.AppointmentResource.get({ id: task.appointment }, { populate: 'favors.favor' });
                    this.appointment.$promise.then(function (appointment) {
                        _this.originalAppointment = appointment;
                        _this.masters.forEach(function (m) {
                            if (m._id === _this.appointment.master) {
                                _this.favors = m.services;
                            }
                        });
                    });
                }
                EditDialogController.prototype.AddToCalendar = function () { };
                EditDialogController.prototype.deleteService = function (favor) {
                    this.appointment.favors.splice(this.appointment.favors.indexOf(favor), 1);
                };
                EditDialogController.prototype.addService = function (favor) {
                    this.appointment.favors.push(this.newService);
                };
                EditDialogController.prototype.changeMaster = function (master) {
                    var _this = this;
                    if (master != this.appointment.master) {
                        this.appointment.favors = [];
                        this.masters.forEach(function (m) {
                            if (m._id === _this.appointment.master) {
                                _this.favors = m.services;
                                return;
                            }
                        });
                    }
                };
                EditDialogController.prototype.save = function ($form) {
                    if ($form.$valid) {
                        angular.extend(this.originalAppointment, this.appointment);
                        this.$mdDialog.hide({ action: "save", appointment: this.originalAppointment });
                    }
                };
                EditDialogController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                EditDialogController.$inject = ['$mdDialog', appointment_resource_1.AppointmentResourceName, 'task'];
                return EditDialogController;
            }());
            MasterSchedulerComponentController = (function () {
                function MasterSchedulerComponentController($log, $timeout, $mdDialog, $scope, MasterResource, $routeParams, AppointmentResource) {
                    this.$log = $log;
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.$scope = $scope;
                    this.MasterResource = MasterResource;
                    this.$routeParams = $routeParams;
                    this.AppointmentResource = AppointmentResource;
                    this.events = [];
                    this.tasks = [];
                    this.mode = 'master';
                    if (this.$routeParams["id"]) {
                        this.masterId = this.$routeParams["id"];
                    }
                    else {
                        this.masterId = this.masterid;
                        this.mode = 'appointment';
                    }
                    this.init();
                }
                MasterSchedulerComponentController.prototype.init = function () {
                    switch (this.mode) {
                        case "appointment":
                            this.masterId = this.masterid;
                            this.initWeekAppointmentConfig();
                            break;
                        case "master":
                            this.appointment = new this.AppointmentResource();
                            if (this.$routeParams["id"]) {
                                this.masterId = this.$routeParams["id"];
                            }
                            this.initWeekConfig();
                            break;
                        default:
                            throw "unknown action";
                    }
                    this.initWeekConfig();
                    this.initNavigatorConfig();
                    this.loadEvents(new Date());
                };
                MasterSchedulerComponentController.prototype.getStartAndEndOfWeek = function (date) {
                    date = new Date(date);
                    var day = date.getDay(), diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
                    var start = new Date(date.setDate(diff));
                    var end = new Date(date.setDate(start.getDate() + 7));
                    return [start, end];
                };
                MasterSchedulerComponentController.prototype.loadEvents = function (start) {
                    var _this = this;
                    if (this.masterId) {
                        var days = this.getStartAndEndOfWeek(start);
                        var params = {
                            id: this.masterId,
                            start: days[0].toISOString(),
                            end: days[1].toISOString(),
                        };
                        this.MasterResource.getTasks(params).$promise.then(function (tasks) {
                            _this.tasks = tasks;
                            _this.events = _this.tasks.map(function (task) {
                                return angular.copy(task.scheduler);
                            });
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                MasterSchedulerComponentController.prototype.initWeekConfig = function () {
                    var _this = this;
                    this.weekConfig = {
                        visible: true,
                        viewType: "Week",
                        api: 2,
                        angularAutoApply: true,
                        locale: "ru-ru",
                        cellHeight: "36",
                        businessEndsHour: "19",
                        hideUntilInit: true,
                        eventMoveHandling: 'Disabled',
                        heightSpec: 'BusinessHours',
                        onTimeRangeSelect: function (args) {
                            var params = {
                                scheduler: {
                                    start: args.start.toString(),
                                    end: args.end.toString(),
                                    text: "New event",
                                    id: DayPilot.guid()
                                }
                            };
                            _this.MasterResource.addTask({ id: _this.masterId }, params).$promise.then(function (task) {
                                _this.tasks.push(task);
                                _this.events.push(task.scheduler);
                                _this.$scope.week.update();
                            });
                        },
                        onEventResize: function (args) {
                            var event = {
                                id: args.e.id(),
                                start: args.newStart.toString(),
                                end: args.newEnd.toString(),
                                text: args.e.text()
                            };
                            var originalTask;
                            var tasks = _this.tasks.filter(function (task) {
                                return task != null && task.scheduler.id === event.id;
                            });
                            if (tasks.length > 0 && event) {
                                var task = tasks[0];
                                originalTask = angular.copy(task);
                                task.scheduler = event;
                                _this.MasterResource.updateTask({ id: _this.masterId }, task).$promise.then(function (newTask) {
                                    _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                                }).catch(function (err) {
                                    _this.revertResize(originalTask);
                                    _this.$scope.week.update();
                                    _this.$log.error(err);
                                    _this.showErrorDialog();
                                });
                            }
                        },
                        onEventClick: function (args) {
                            var tasks = _this.tasks.filter(function (task) {
                                return task != null && task.scheduler.id === args.e.id();
                            });
                            if (tasks.length > 0) {
                                var task = tasks[0];
                                if (!task.appointment) {
                                    _this.createAppointment(task);
                                }
                                else {
                                    _this.createEditDialod(task);
                                }
                            }
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.initWeekAppointmentConfig = function () {
                    var _this = this;
                    this.weekConfig = {
                        visible: true,
                        viewType: "Week",
                        api: 2,
                        angularAutoApply: true,
                        locale: "ru-ru",
                        cellHeight: "36",
                        businessEndsHour: "19",
                        hideUntilInit: true,
                        eventMoveHandling: 'Disabled',
                        heightSpec: 'BusinessHours',
                        onTimeRangeSelect: function (args) {
                            var params = {
                                scheduler: {
                                    start: args.start.toString(),
                                    end: args.end.toString(),
                                    text: "New event",
                                    id: DayPilot.guid()
                                }
                            };
                            _this.MasterResource.addTask({ id: _this.masterId }, params).$promise.then(function (task) {
                                _this.tasks.push(task);
                                _this.events.push(task.scheduler);
                                _this.$scope.week.update();
                            });
                        },
                        onEventResize: function (args) {
                            var event = {
                                id: args.e.id(),
                                start: args.newStart.toString(),
                                end: args.newEnd.toString(),
                                text: args.e.text()
                            };
                            var originalTask;
                            var tasks = _this.tasks.filter(function (task) {
                                return task != null && task.scheduler.id === event.id;
                            });
                            if (tasks.length > 0 && event) {
                                var task = tasks[0];
                                originalTask = angular.copy(task);
                                task.scheduler = event;
                                _this.MasterResource.updateTask({ id: _this.masterId }, task).$promise.then(function (newTask) {
                                    _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                                }).catch(function (err) {
                                    _this.revertResize(originalTask);
                                    _this.$scope.week.update();
                                    _this.$log.error(err);
                                    _this.showErrorDialog();
                                });
                            }
                        },
                        onEventClick: function (args) {
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.initNavigatorConfig = function () {
                    var _this = this;
                    this.navigatorConfig = {
                        selectMode: "week",
                        showMonths: 3,
                        skipMonths: 3,
                        locale: "ru-ru",
                        cellHeight: "34",
                        cellWidth: "30",
                        onTimeRangeSelected: function (args) {
                            _this.weekConfig.startDate = args.day;
                            _this.loadEvents(args.day);
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.createAppointment = function (task) {
                    var _this = this;
                    this.appointment.$save()
                        .then(function (appointment) {
                        task.appointment = appointment;
                        _this.MasterResource.updateTask({ id: _this.masterId }, task).$promise.then(function (newTask) {
                            _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                            _this.createEditDialod(newTask);
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    })
                        .catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                MasterSchedulerComponentController.prototype.createEditDialod = function (task) {
                    var _this = this;
                    this.$mdDialog.show({
                        template: editOrderDialogTemplate,
                        controller: EditDialogController,
                        controllerAs: '$ctrl',
                        bindToController: true,
                        locals: {
                            task: task
                        },
                        parent: angular.element(document.body),
                    }).then(function (result) {
                        _this.handleDialogResult(result);
                    });
                };
                MasterSchedulerComponentController.prototype.handleDialogResult = function (result) {
                    switch (result.action) {
                        case "delete":
                            this.deleteMasterTask(result.event);
                            break;
                        case "save":
                            this.updateMaster(result.event);
                            break;
                        default:
                            throw "unknown action";
                    }
                };
                MasterSchedulerComponentController.prototype.updateMaster = function (event) {
                    var _this = this;
                    var tasks = this.tasks.filter(function (task) {
                        return task != null && task.scheduler.id === event.id;
                    });
                    if (tasks.length > 0 && event) {
                        var task = tasks[0];
                        task.scheduler.text = event.text;
                        task.scheduler.start = event.start.value;
                        task.scheduler.end = event.end.value;
                        ;
                        this.MasterResource.updateTask({ id: this.masterId }, task).$promise.then(function (newTask) {
                            _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                            var tempEvents = _this.events.filter(function (e) {
                                return e.id == event.id;
                            });
                            if (tempEvents.length > 0 && event) {
                                _this.events.splice(_this.events.indexOf(tempEvents[0]), 1, newTask.scheduler);
                            }
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                MasterSchedulerComponentController.prototype.updateMasterOnResize = function (event) {
                    var _this = this;
                    var originalTask;
                    var tasks = this.tasks.filter(function (task) {
                        return task != null && task.scheduler.id === event.id;
                    });
                    if (tasks.length > 0 && event) {
                        var task = tasks[0];
                        originalTask = task;
                        task.scheduler = event;
                        this.MasterResource.updateTask({ id: this.masterId }, task).$promise.then(function (newTask) {
                            _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                        }).catch(function (err) {
                            _this.revertResize(originalTask);
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                MasterSchedulerComponentController.prototype.revertResize = function (originalTask) {
                    var events = this.events.filter(function (e) {
                        return e.id == originalTask.scheduler.id;
                    });
                    if (events.length > 0) {
                        this.events.splice(this.events.indexOf(events[0]), 1, originalTask.scheduler);
                    }
                };
                MasterSchedulerComponentController.prototype.deleteMasterTask = function (event) {
                    var _this = this;
                    var tasks = this.tasks.filter(function (t) {
                        return t.scheduler.id == event.id;
                    });
                    if (tasks.length > 0) {
                        var deleteTask = tasks[0];
                        this.MasterResource.deleteTask({ id: this.masterId, taskId: deleteTask._id }).$promise.then(function (task) {
                            _this.tasks.splice(_this.tasks.indexOf(deleteTask), 1);
                            var events = _this.events.filter(function (e) {
                                return e.id == event.id;
                            });
                            if (events.length > 0 && event) {
                                _this.events.splice(_this.events.indexOf(events[0]), 1);
                            }
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                };
                MasterSchedulerComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                MasterSchedulerComponentController.$inject = ["$log", '$timeout', "$mdDialog", "$scope", master_resource_1.MasterResourceName, "$routeParams", appointment_resource_1.AppointmentResourceName];
                return MasterSchedulerComponentController;
            }());
            exports_1("MasterSchedulerComponentController", MasterSchedulerComponentController);
            exports_1("MasterSchedulerComponentName", MasterSchedulerComponentName = 'pgMasterScheduler');
            exports_1("MasterSchedulerComponentOptions", MasterSchedulerComponentOptions = {
                controller: MasterSchedulerComponentController,
                template: template,
                bindings: {
                    'mname': "=",
                    'photo': '=',
                    'masterid': "=",
                    'mode': '=',
                    "appointment": '='
                }
            });
        }
    }
});
//# sourceMappingURL=master.scheduler.js.map