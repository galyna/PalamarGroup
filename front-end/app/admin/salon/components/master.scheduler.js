System.register(["../../../resources/master.resource", "../../../users/services/it.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1, it_service_1;
    var template, editOrderDialogTemplate, EditDialogController, MasterSchedulerComponentController, MasterSchedulerComponentName, MasterSchedulerComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            },
            function (it_service_1_1) {
                it_service_1 = it_service_1_1;
            }],
        execute: function() {
            template = "\n\n <div layout=\"row\" class=\"master-scheduler\" layout-xs=\"column\">\n                <div hide show-gt-xs=\"true\" class=\"md-padding \" layout=\"row\" layout-align=\"start start\">\n                    <daypilot-navigator  style=\" width: 270px;top:0;\" id=\"navi\"\n                                        daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n                   \n                </div>\n                <div hide-gt-xs=\"true\" class=\"md-padding \" layout=\"row\" layout-align=\"center center\">\n                   \n                    <daypilot-navigator  style=\" width: 280px\" id=\"navis\"\n                                        daypilot-config=\"$ctrl.navigatorSmallConfig\"></daypilot-navigator>\n                </div>\n                <div flex class=\"md-padding \">\n                    <daypilot-calendar id=\"week\" daypilot-config=\"$ctrl.weekConfig\"\n                                       daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n                </div>\n\n            </div>";
            editOrderDialogTemplate = "<md-dialog aria-label=\"Order edit\" ng-cloak>\n\n    <md-toolbar>\n        <div class=\"md-toolbar-tools\">\n            <img ng-src=\"{{$ctrl.masterPhoto}}\" class=\"avatar\" alt=\"{{$ctrl.masterPhoto}}\"/>\n            <h2>\u0414\u0435\u0442\u0430\u043B\u0456 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F</h2>\n            <span flex></span>\n            <md-button class=\"md-icon-button\" ng-click=\"$ctrl.cancel()\">\n                <md-icon md-svg-src=\"navigation:ic_close_24px\" aria-label=\"Close dialog\"></md-icon>\n            </md-button>\n        </div>\n\n    </md-toolbar>\n    <md-dialog-content>\n        <div class=\"md-dialog-content\" layout=\"column\">\n            <div layout-gt-sm=\"row\" layout=\"column\">\n                <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\" class=\"md-margin\" ng-if=\"!$ctrl.appointment.isDayOff\">\n                    <md-subheader class=\"md-no-sticky\">\u0406\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F \u0432\u0456\u0434 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430\n                    </md-subheader>\n                    <md-input-container class=\"md-block\">\n                        <label>\u0417\u0430\u043C\u043E\u0432\u043D\u0438\u043A</label>\n                        <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                               ng-model=\"$ctrl.appointment.name\">\n                    </md-input-container>\n                    <md-input-container class=\"md-block\">\n                        <label>\u0422\u0435\u043B\u0444\u043E\u043D</label>\n                        <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                               ng-model=\"$ctrl.appointment.phone\">\n                    </md-input-container>\n\n                    <md-input-container class=\"md-block\">\n                        <label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u0437\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430</label>\n                        <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\"\n                               ng-model=\"$ctrl.appointment.comment\"/>\n                    </md-input-container>\n                    <md-input-container class=\"md-block\">\n                        <md-checkbox ng-disabled=\"::!$root.it.can('modifySalon')\"\n                                     ng-model=\"$ctrl.appointment.isConsultation\">\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044C \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u044E\n                        </md-checkbox>\n                    </md-input-container>\n                </div>\n                <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\"\n                     ng-if=\"!$ctrl.appointment.isDayOff && !$ctrl.appointment.isConsultation \"\n                     class=\"md-margin md-whiteframe-z8\">\n                    <md-subheader ng-if=\"$ctrl.appointment.favors.length>0\" class=\"md-no-sticky\">\u041F\u043E\u0441\u043B\u0443\u0433\u0438</md-subheader>\n                    <md-input-container ng-if=\"$ctrl.appointment.favors.length>0\" class=\"md-block\">\n\n                        <div ng-repeat=\"favor in $ctrl.appointment.favors\">\n                            <div layout=\"row\" flex>\n                                <img ng-src=\"{{favor.photo}}\" class=\"avatar\" alt=\"{{favor.photo}}\"/>\n                                <div flex layout=\"column\"  layout=\"center\">\n                                   \n                                     <div  id=\"prokgram\" name=\"program\">\n                                    {{favor.name}}\n                                </div>\n                                    <div  id=\"program\" name=\"program\">\n                                        {{favor.price}} \u0433\u0440\u043D.\n                                    </div>\n                                </div>\n                               \n                                <md-button  ng-if=\"::$root.it.can('modifySalon')\"\n                                           class=\"md-icon-button\"\n                                           ng-click=\"$ctrl.deleteService(favor)\">\n                                    <md-icon md-svg-src=\"action:ic_delete_24px\"></md-icon>\n                                </md-button>\n                            </div>\n                        </div>\n                    </md-input-container>\n                    <md-subheader ng-if=\"$ctrl.showAddFavors && $root.it.can('modifySalon')\" class=\"md-no-sticky\">\u0414\u043E\u0434\u0430\u0442\u0438\n                        \u043F\u043E\u0441\u043B\u0443\u0433\u0443\n                    </md-subheader>\n                    <md-select ng-if=\"$ctrl.showAddFavors && $root.it.can('modifySalon') \" ng-model=\"$ctrl.newService\"\n                               ng-model-options=\"{trackBy: '$value._id'}\">\n                        <md-option ng-repeat=\"services in $ctrl.services\" ng-value=\"services\">\n                            <div layout=\"row\" layout-align=\" start center  \">\n                                <img ng-src=\"{{services.favor.photo.url}}\" class=\"avatar\"\n                                     alt=\"{{services.favor.name}}\"/>\n                                <span>  {{ services.favor.name }}  </span></div>\n                        </md-option>\n                    </md-select>\n                    <md-input-container ng-if=\"$ctrl.showAddFavors && $root.it.can('modifySalon')\" layout=\"row\"\n                                        class=\"md-block\">\n                        <label for=\"newProgram\">\u0426\u0406\u041D\u0410</label>\n                        <input type=\"number\" ng-model=\"$ctrl.newService.price\"/>\n\n                    </md-input-container>\n                    <md-button ng-if=\"$ctrl.showAddFavors && $root.it.can('modifySalon')\"\n                               ng-disabled=\"!$ctrl.newService \" class=\"md-raised \" ng-click=\"$ctrl.addService()\">\n                        \u0414\u043E\u0434\u0430\u0442\u0438 \u043F\u043E\u0441\u043B\u0443\u0433\u0443\n                    </md-button>\n\n                </div>\n                <div flex=\"100\" flex-gt-sm=\"30\" layout=\"column\" class=\"md-margin\">\n                    <md-subheader class=\" md-margin  md-no-sticky\">\u0410\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u0430 \u0447\u0430\u0441\u0442\u0438\u043D\u0430\n                    </md-subheader>\n                    <md-input-container class=\"md-block\">\n                        <label>\u041A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430</label>\n                        <textarea class=\" md-padding  \" ng-disabled=\"::!$root.it.can('modifySalon')\"\n                                  ng-model=\"$ctrl.appointment.admin_comment\"></textarea>\n                    </md-input-container>\n                    <md-input-container class=\"md-block\">\n                        <md-checkbox ng-disabled=\"::!$root.it.can('modifySalon')\" ng-model=\"$ctrl.appointment.isDayOff\">\n                            \u0427\u0430\u0441 \u0431\u0435\u0437 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u044C\n                        </md-checkbox>\n                    </md-input-container>\n                    <md-input-container class=\"md-block\">\n                        <md-checkbox ng-disabled=\"::!$root.it.can('modifySalon')\"\n                                     ng-model=\"$ctrl.appointment.isPreOrder\">\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0454 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F\n                        </md-checkbox>\n                    </md-input-container>\n                </div>\n            </div>\n            <div class=\" md-padding \" ng-if=\"::$root.it.can('modifySalon')\" layout-gt-sm=\"row\" layout=\"column\">\n\n                <span flex></span>\n\n                <md-button class=\" md-primary md-accent\" ng-click=\"$ctrl.delete()\" aria-label=\"cancel\">\n                    \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n                </md-button>\n                <md-button class=\" md-raised md-primary md-accent\" ng-click=\"$ctrl.save()\" aria-label=\"save\">\n                    \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438\n                </md-button>\n\n                <md-button class=\"md-raised  md-primary\" ng-click=\"$ctrl.cancel()\" aria-label=\"cancel\">\n                    \u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438\n                </md-button>\n            </div>\n        </div>\n    </md-dialog-content>\n\n\n</md-dialog>\n";
            EditDialogController = (function () {
                function EditDialogController($mdDialog, $mdToast, task) {
                    this.$mdDialog = $mdDialog;
                    this.$mdToast = $mdToast;
                    this.task = task;
                    this.appointment = angular.copy(task.appointment);
                    this.originalAppointment = this.appointment;
                    this.setServices();
                }
                EditDialogController.prototype.deleteService = function (favor) {
                    this.appointment.favors.splice(this.appointment.favors.indexOf(favor), 1);
                };
                EditDialogController.prototype.addService = function () {
                    var _this = this;
                    if (!this.appointment.favors.some(function (f) {
                        return _this.newService._id === f.id;
                    })) {
                        this.appointment.favors.push({
                            name: this.newService.favor.name,
                            photo: this.newService.favor.photo.url,
                            id: this.newService._id,
                            price: this.newService.price,
                        });
                        this.newService = null;
                    }
                    else {
                        this.$mdToast.showSimple("\u0422\u0430\u043A\u0430 \u043F\u043E\u0441\u043B\u0443\u0433\u0430 \u0432\u0436\u0435 \u0456\u0441\u043D\u0443\u0454");
                    }
                };
                EditDialogController.prototype.setServices = function () {
                    var _this = this;
                    this.showAddFavors = false;
                    this.masters.forEach(function (m) {
                        if (m._id === _this.appointment.master) {
                            _this.services = m.services;
                            _this.masterPhoto = m.photo.url;
                            _this.showAddFavors = true;
                            return;
                        }
                    });
                };
                EditDialogController.prototype.save = function () {
                    angular.extend(this.originalAppointment, this.appointment);
                    this.task.appointment = this.originalAppointment;
                    this.$mdDialog.hide({ action: "save", task: this.task });
                };
                EditDialogController.prototype.delete = function () {
                    this.$mdDialog.hide({ action: "delete", task: this.task });
                };
                EditDialogController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                EditDialogController.$inject = ['$mdDialog', "$mdToast", 'task'];
                return EditDialogController;
            }());
            MasterSchedulerComponentController = (function () {
                function MasterSchedulerComponentController($log, $timeout, $mdDialog, $scope, MasterResource, $routeParams, ItService) {
                    this.$log = $log;
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.$scope = $scope;
                    this.MasterResource = MasterResource;
                    this.$routeParams = $routeParams;
                    this.ItService = ItService;
                    this.events = [];
                    this.tasks = [];
                    this.masters = this.MasterResource.query({ populate: 'services.favor' });
                    if (this.$routeParams["id"]) {
                        this.masterId = this.$routeParams["id"];
                    }
                    this.init();
                }
                MasterSchedulerComponentController.prototype.init = function () {
                    this.initWeekConfig();
                    this.initNavigatorConfig();
                    this.initNavigatorSmallConfig();
                    this.loadEvents(new Date());
                };
                MasterSchedulerComponentController.prototype.getStartAndEndOfWeek = function (date) {
                    date = new Date(date);
                    date.setUTCHours(0);
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
                        angularAutoApply: true,
                        locale: "uk-ua",
                        cellHeight: "32",
                        businessBeginsHour: "10",
                        businessEndsHour: "19",
                        hideUntilInit: true,
                        headerDateFormat: 'dd.MM',
                        eventMoveHandling: 'Disabled',
                        eventResizeHandling: 'Disabled',
                        heightSpec: 'BusinessHours',
                        startDate: new Date(),
                        onEventClick: function (args) {
                            var tasks = _this.tasks.filter(function (task) {
                                return task != null && task.scheduler.id === args.e.id();
                            });
                            if (tasks.length > 0) {
                                _this.createEditDialod(tasks[0]);
                            }
                        }
                    };
                    if (this.ItService.can('modifySalon')) {
                        this.weekConfig.eventResizeHandling = 'Update';
                        this.iniOnTimeRangeSelect();
                        this.iniOnEventResize();
                    }
                };
                MasterSchedulerComponentController.prototype.initNavigatorSmallConfig = function () {
                    var _this = this;
                    this.navigatorSmallConfig = {
                        selectMode: "week",
                        showMonths: 1,
                        skipMonths: 1,
                        locale: "uk-ua",
                        cellHeight: "40",
                        cellWidth: "40",
                        onTimeRangeSelected: function (args) {
                            _this.weekConfig.startDate = args.day;
                            _this.loadEvents(args.day);
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.initNavigatorConfig = function () {
                    var _this = this;
                    this.navigatorConfig = {
                        selectMode: "week",
                        showMonths: 3,
                        skipMonths: 3,
                        locale: "uk-ua",
                        cellHeight: "26.5",
                        cellWidth: "26",
                        onTimeRangeSelected: function (args) {
                            _this.weekConfig.startDate = args.day;
                            _this.loadEvents(args.day);
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.iniOnEventResize = function () {
                    var _this = this;
                    this.weekConfig.onEventResize = function (args) {
                        var event = {
                            id: args.e.id(),
                            start: args.newStart.toString(),
                            end: args.newEnd.toString(),
                            text: args.e.text(),
                            borderColor: args.e.borderColor,
                            barColor: args.e.barColor,
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
                    };
                };
                MasterSchedulerComponentController.prototype.iniOnTimeRangeSelect = function () {
                    var _this = this;
                    this.weekConfig.onTimeRangeSelect = function (args) {
                        var params = {
                            appointment: {
                                date: new Date(),
                                master: _this.masterId
                            },
                            scheduler: {
                                start: args.start.toString(),
                                end: args.end.toString(),
                                text: "Новий запис, Заповніть форму",
                                borderColor: "red",
                                barColor: "red",
                                id: DayPilot.guid()
                            }
                        };
                        _this.MasterResource.addTask({ id: _this.masterId }, params).$promise.then(function (task) {
                            _this.tasks.push(task);
                            _this.events.push(task.scheduler);
                            _this.$scope.week.update();
                        });
                    };
                };
                MasterSchedulerComponentController.prototype.createEditDialod = function (task) {
                    var _this = this;
                    this.$mdDialog.show({
                        template: editOrderDialogTemplate,
                        controller: EditDialogController,
                        controllerAs: '$ctrl',
                        bindToController: true,
                        clickOutsideToClose: true,
                        locals: {
                            task: task,
                            masters: this.masters
                        },
                        parent: angular.element(document.body),
                    }).then(function (result) {
                        _this.handleDialogResult(result);
                    });
                };
                MasterSchedulerComponentController.prototype.handleDialogResult = function (result) {
                    switch (result.action) {
                        case "delete":
                            this.deleteMasterTask(result.task);
                            break;
                        case "save":
                            this.updateMaster(result.task);
                            break;
                        default:
                            throw "unknown action";
                    }
                };
                MasterSchedulerComponentController.prototype.updateTaskText = function (task) {
                    task.scheduler.text = "";
                    if (!task.appointment.name) {
                        task.scheduler.text = task.scheduler.text + "<div>\u0417\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0430 \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u043E</div>";
                    }
                    else {
                        task.scheduler.borderColor = "blue";
                        task.scheduler.barColor = "blue";
                        task.scheduler.text = "<div><span>\u0417\u0430\u043C\u043E\u0432\u043D\u0438\u043A:</span><span> " + task.appointment.name + "</span></div>";
                    }
                    if (task.appointment.isConsultation) {
                        task.scheduler.text = task.scheduler.text + "<div>\u0417\u0430\u043F\u0438\u0441 \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0456\u044E</div>";
                        task.scheduler.borderColor = "yellow";
                        task.scheduler.barColor = "yellow";
                        task.appointment.favors = [];
                    }
                    else {
                        if (task.appointment.favors.length == 0) {
                            task.scheduler.text = task.scheduler.text + "<div>\u041F\u043E\u0441\u043B\u0443\u0433\u0438 \u043D\u0435 \u0432\u043A\u0430\u0437\u0430\u043D\u0456</div>";
                        }
                        else {
                            var favors = task.appointment.favors.map(function (f) {
                                return f.name;
                            }).join(' ');
                            task.scheduler.text = task.scheduler.text + ("<div><span>\u041F\u043E\u0441\u043B\u0443\u0433\u0438:</span><span> " + favors + "</span></div>");
                        }
                        if (task.appointment.favors.length == 0 || !task.appointment.name) {
                            task.scheduler.borderColor = "red";
                            task.scheduler.barColor = "red";
                        }
                    }
                    if (task.appointment.isDayOff) {
                        task.scheduler.text = "<div>\u0427\u0430\u0441 \u0431\u0435\u0437 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u044C</div>";
                        task.scheduler.borderColor = "grey";
                        task.scheduler.barColor = "grey";
                    }
                    if (task.appointment.isPreOrder) {
                        task.scheduler.borderColor = "green";
                        task.scheduler.barColor = "green";
                    }
                };
                MasterSchedulerComponentController.prototype.updateMaster = function (task) {
                    var _this = this;
                    this.updateTaskText(task);
                    this.MasterResource.updateTask({ id: this.masterId }, task).$promise.then(function (newTask) {
                        _this.tasks.splice(_this.tasks.indexOf(task), 1, newTask);
                        var tempEvents = _this.events.filter(function (e) {
                            return e.id == newTask.scheduler.id;
                        });
                        if (tempEvents.length > 0 && event) {
                            _this.events.splice(_this.events.indexOf(tempEvents[0]), 1, newTask.scheduler);
                        }
                    }).catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
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
                MasterSchedulerComponentController.prototype.deleteMasterTask = function (deleteTask) {
                    var _this = this;
                    this.MasterResource.deleteTask({ id: this.masterId, taskId: deleteTask._id }).$promise.then(function (master) {
                        _this.tasks.splice(_this.tasks.indexOf(deleteTask), 1);
                        var events = _this.events.filter(function (e) {
                            return e.id == deleteTask.scheduler.id;
                        });
                        if (events.length > 0 && event) {
                            _this.events.splice(_this.events.indexOf(events[0]), 1);
                        }
                    }).catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                MasterSchedulerComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                MasterSchedulerComponentController.$inject = ["$log", '$timeout', "$mdDialog", "$scope", master_resource_1.MasterResourceName, "$routeParams", it_service_1.ItServiceName];
                return MasterSchedulerComponentController;
            }());
            exports_1("MasterSchedulerComponentController", MasterSchedulerComponentController);
            exports_1("MasterSchedulerComponentName", MasterSchedulerComponentName = 'pgMasterScheduler');
            exports_1("MasterSchedulerComponentOptions", MasterSchedulerComponentOptions = {
                controller: MasterSchedulerComponentController,
                template: template
            });
        }
    }
});
//# sourceMappingURL=master.scheduler.js.map