System.register(["../../../resources/master.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1;
    var template, editOrderDialogTemplate, EditDialogController, MasterSchedulerComponentController, MasterSchedulerComponentName, MasterSchedulerComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            }],
        execute: function() {
            template = "<div  layout=\"row\" layout-xs=\"column\">\n<div class=\"md-padding \" >\n    <daypilot-navigator style=\" width: 280px\" id=\"navi\"\n                        daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n</div>\n<div flex class=\"md-padding \">\n    <daypilot-calendar id=\"week\" daypilot-config=\"$ctrl.weekConfig\" daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n</div>\n\n</div>";
            editOrderDialogTemplate = "<md-dialog aria-label=\"Order edit\" ng-cloak>\n  \n        <md-toolbar>\n            <div class=\"md-toolbar-tools\">\n                <h2 >\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0430 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F</h2>\n                <span flex></span>\n                <md-button class=\"md-icon-button\" ng-click=\"$ctrl.cancel()\">\n                    <md-icon md-svg-src=\"navigation:ic_close_24px\" aria-label=\"Close dialog\"></md-icon>\n                </md-button>\n            </div>\n            \n        </md-toolbar>\n        <md-dialog-content>\n            <div class=\"md-dialog-content\" layout=\"row\">\n                </md-input-container>\n                    <md-input-container class=\"md-block\">\n                    <label>\u0422\u0435\u0445\u0442</label>\n                    <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\" ng-model=\"$ctrl.tempEvent.text\" >\n                </md-input-container>\n                 </md-input-container>\n                    <md-input-container class=\"md-block\">\n                    <label>\u0422\u0435\u0445\u0442</label>\n                    <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\" ng-model=\"$ctrl.tempEvent.start.value\" >\n                </md-input-container>\n                 </md-input-container>\n                    <md-input-container class=\"md-block\">\n                    <label>\u0422\u0435\u0445\u0442</label>\n                    <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\" ng-model=\"$ctrl.tempEvent.end.value\" >\n                </md-input-container>\n            </div>\n        </md-dialog-content>\n        <md-dialog-actions layout=\"row\" ng-if=\"::$root.it.can('modifySalon')\">\n         <span flex></span>\n         \n                        <md-button ng-click=\"$ctrl.deleteEvent()\" aria-label=\"cancel\">\n                \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n            </md-button>\n                        <md-button ng-click=\"$ctrl.saveEvent()\" aria-label=\"cancel\">\n                \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438\n            </md-button>\n           \n            <md-button ng-click=\"$ctrl.cancel()\" aria-label=\"cancel\">\n                \u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438\n            </md-button>\n\n        </md-dialog-actions>\n\n</md-dialog>\n";
            EditDialogController = (function () {
                function EditDialogController($mdDialog, tempEvent) {
                    this.$mdDialog = $mdDialog;
                    this.tempEvent = angular.copy(tempEvent);
                    this.originaltempEvent = tempEvent;
                }
                EditDialogController.prototype.save = function ($form) {
                    angular.extend(this.originaltempEvent, this.tempEvent);
                    this.$mdDialog.hide({ action: "save", event: this.originaltempEvent });
                };
                EditDialogController.prototype.deleteEvent = function () {
                    this.$mdDialog.hide({ action: "delete", event: this.originaltempEvent });
                };
                EditDialogController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                EditDialogController.$inject = ['$mdDialog', 'tempEvent'];
                return EditDialogController;
            }());
            MasterSchedulerComponentController = (function () {
                function MasterSchedulerComponentController($timeout, $mdDialog, $scope, MasterResource, $routeParams) {
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.$scope = $scope;
                    this.MasterResource = MasterResource;
                    this.$routeParams = $routeParams;
                    this.events = [];
                    this.init();
                }
                MasterSchedulerComponentController.prototype.init = function () {
                    this.initEvents();
                    this.initWeekConfig();
                    this.initNavigatorConfig();
                };
                MasterSchedulerComponentController.prototype.initEvents = function () {
                    var _this = this;
                    if (this.$routeParams["id"]) {
                        this.MasterResource.get({ id: this.$routeParams["id"], populate: 'tasks' }).$promise
                            .then(function (master) {
                            _this.master = master;
                            _this.events = _this.master.tasks ? _this.master.tasks.filter(function (task) { return task != null; }).map(function (task) { return task.scheduler; }) : [];
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
                            _this.weekControl = _this.$scope.week;
                            _this.MasterResource.addTask({ id: _this.master._id }, params).$promise.then(function (master) {
                                _this.master = master;
                                _this.events = _this.master.tasks.filter(function (task) { return task != null; }).map(function (task) { return task.scheduler; });
                                _this.weekControl.update();
                            });
                        },
                        onEventResize: function (args) {
                            var params = {
                                id: args.e.id(),
                                newStart: args.newStart.toString(),
                                newEnd: args.newEnd.toString()
                            };
                            var event = _this.events.filter(function (e) {
                                return e.id == args.e.id();
                            });
                            if (event.length > 0) {
                            }
                        },
                        onEventClick: function (args) {
                            _this.$mdDialog.show({
                                template: editOrderDialogTemplate,
                                controller: EditDialogController,
                                controllerAs: '$ctrl',
                                bindToController: true,
                                locals: {
                                    tempEvent: {
                                        id: args.e.id(),
                                        text: args.e.text(),
                                        start: args.e.start(),
                                        end: args.e.end()
                                    }
                                },
                                parent: angular.element(document.body),
                            }).then(function (result) {
                                _this.handleDialogResult(result);
                            });
                        }
                    };
                };
                ;
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
                            _this.loadEvents();
                        }
                    };
                };
                MasterSchedulerComponentController.prototype.updateMaster = function (result) {
                    var _this = this;
                    this.MasterResource.updateTask({ id: this.master._id }, result.event).$promise.then(function (task) {
                        var event = _this.events.filter(function (e) {
                            return e.id == result.event.id;
                        });
                        if (event.length > 0 && result.event) {
                        }
                    });
                };
                MasterSchedulerComponentController.prototype.deleteMasterTask = function (result) {
                    var _this = this;
                    var tasks = this.master.tasks.filter(function (t) {
                        return t.scheduler.id == result.event.id;
                    });
                    if (tasks.length > 0) {
                        var deleteTask = tasks[0];
                        this.MasterResource.deleteTask({ id: this.master._id, taskId: deleteTask._id }).$promise.then(function (task) {
                            _this.master.tasks.splice(_this.master.tasks.indexOf(deleteTask), 1);
                            var events = _this.events.filter(function (e) {
                                return e.id == result.event.id;
                            });
                            if (events.length > 0 && result.event) {
                                _this.events.splice(_this.events.indexOf(events[0]), 1);
                            }
                        });
                    }
                };
                MasterSchedulerComponentController.prototype.handleDialogResult = function (result) {
                    switch (result.action) {
                        case "delete":
                            this.deleteMasterTask(result);
                            break;
                        case "save":
                            this.updateMaster(result);
                            break;
                        default:
                            throw "unnovn action";
                    }
                    //  this.events = [];
                };
                MasterSchedulerComponentController.prototype.loadEvents = function () {
                    // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
                    this.$timeout(function () {
                        //   var params = {
                        //     start: this.week.visibleStart().toString(),
                        //     end: this.week.visibleEnd().toString()
                        // }toString
                        //  $http.post('@Url.Action("Events", "Backend")', params).success(function (data) {
                        //     $scope.events = data;
                        // });
                    });
                };
                MasterSchedulerComponentController.$inject = ['$timeout', "$mdDialog", "$scope", master_resource_1.MasterResourceName, "$routeParams"];
                return MasterSchedulerComponentController;
            }());
            exports_1("MasterSchedulerComponentController", MasterSchedulerComponentController);
            exports_1("MasterSchedulerComponentName", MasterSchedulerComponentName = 'pgMasterSceduler');
            exports_1("MasterSchedulerComponentOptions", MasterSchedulerComponentOptions = {
                controller: MasterSchedulerComponentController,
                template: template
            });
        }
    }
});
//# sourceMappingURL=master.scheduler.js.map