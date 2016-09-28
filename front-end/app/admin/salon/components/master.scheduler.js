System.register(["../../../resources/master.resource"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var master_resource_1;
    var template, editOrderDialogTemplate, MasterSchedulerComponentController, MasterSchedulerComponentName, MasterSchedulerComponentOptions;
    return {
        setters:[
            function (master_resource_1_1) {
                master_resource_1 = master_resource_1_1;
            }],
        execute: function() {
            template = "<div  layout=\"row\" layout-xs=\"column\">\n<div class=\"md-padding \" >\n    <daypilot-navigator style=\" width: 280px\" id=\"navi\"\n                        daypilot-config=\"$ctrl.navigatorConfig\"></daypilot-navigator>\n</div>\n<div flex class=\"md-padding \">\n    <daypilot-calendar id=\"week\" daypilot-config=\"$ctrl.weekConfig\" daypilot-events=\"$ctrl.events\"></daypilot-calendar>\n</div>\n\n</div>";
            editOrderDialogTemplate = "<md-dialog aria-label=\"Order edit\" ng-cloak>\n  \n        <md-toolbar>\n            <div class=\"md-toolbar-tools\">\n                <h2 >\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0430 \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F</h2>\n                <span flex></span>\n                <md-button class=\"md-icon-button\" ng-click=\"$ctrl.cancel()\">\n                    <md-icon md-svg-src=\"navigation:ic_close_24px\" aria-label=\"Close dialog\"></md-icon>\n                </md-button>\n            </div>\n            \n        </md-toolbar>\n        <md-dialog-content>\n            <div class=\"md-dialog-content\" layout=\"row\">\n                </md-input-container>\n                    <md-input-container class=\"md-block\">\n                    <label>\u0422\u0435\u0445\u0442</label>\n                    <input ng-disabled=\"::!$root.it.can('modifySalon')\" type=\"text\" ng-model=\"$ctrl.tempEvent.text\" >\n                </md-input-container>\n            </div>\n        </md-dialog-content>\n        <md-dialog-actions layout=\"row\" ng-if=\"::$root.it.can('modifySalon')\">\n         <span flex></span>\n         \n                        <md-button ng-click=\"$ctrl.deleteEvent()\" aria-label=\"cancel\">\n                \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n            </md-button>\n                        <md-button ng-click=\"$ctrl.saveEvent()\" aria-label=\"cancel\">\n                \u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438\n            </md-button>\n           \n            <md-button ng-click=\"$ctrl.cancel()\" aria-label=\"cancel\">\n                \u0412\u0456\u0434\u043C\u0456\u043D\u0438\u0442\u0438\n            </md-button>\n\n        </md-dialog-actions>\n\n</md-dialog>\n";
            MasterSchedulerComponentController = (function () {
                function MasterSchedulerComponentController($timeout, $mdDialog, $scope, MasterResource, $routeParams) {
                    var _this = this;
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.$scope = $scope;
                    this.MasterResource = MasterResource;
                    this.$routeParams = $routeParams;
                    this.events = [];
                    if (this.$routeParams["id"]) {
                        this.MasterResource.get({ id: this.$routeParams["id"], populate: 'services.favor' }).$promise
                            .then(function (master) {
                            _this.master = master;
                            _this.init();
                        });
                    }
                }
                MasterSchedulerComponentController.prototype.initWeekConfig = function () {
                    var _this = this;
                    this.weekConfig = {
                        visible: true,
                        viewType: "Week",
                        angularAutoApply: true,
                        onTimeRangeSelect: function (args) {
                            _this.currentEvent = {
                                start: args.start.toString(),
                                end: args.end.toString(),
                                text: "New event",
                                id: DayPilot.guid()
                            };
                            _this.events.push(_this.currentEvent);
                            _this.weekControl = _this.$scope.week;
                            _this.weekControl.update();
                        },
                        locale: "ru-ru",
                        cellHeight: "36",
                        businessEndsHour: "19",
                        hideUntilInit: true,
                        heightSpec: 'BusinessHours',
                        onEventClick: function (args) {
                            _this.$mdDialog.show({
                                template: editOrderDialogTemplate,
                                controller: MasterSchedulerComponentController,
                                controllerAs: '$ctrl',
                                bindToController: true,
                                locals: {
                                    tempEvents: _this.events,
                                    tempEvent: {
                                        id: args.e.id(),
                                        text: args.e.text(),
                                        start: args.e.start(),
                                        end: args.e.end()
                                    }
                                },
                                parent: angular.element(document.body),
                            }).then(function (events) {
                                _this.events = events;
                                _this.weekControl.update();
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
                MasterSchedulerComponentController.prototype.addEvet = function (e) {
                    //  this.events = [];
                };
                MasterSchedulerComponentController.prototype.init = function () {
                    this.initWeekConfig();
                    this.initNavigatorConfig();
                };
                MasterSchedulerComponentController.prototype.saveEvent = function () {
                    var _this = this;
                    var event = this.tempEvents.filter(function (e) {
                        return e.id == _this.tempEvent.id;
                    });
                    if (event.length > 0) {
                        this.tempEvents.splice(this.tempEvents.indexOf(event[0]), 1, this.tempEvent);
                    }
                    this.$mdDialog.hide(this.tempEvents);
                    this.$mdDialog.cancel();
                };
                MasterSchedulerComponentController.prototype.deleteEvent = function () {
                    this.tempEvents.splice(this.tempEvents.indexOf(this.currentEvent), 1);
                    this.$mdDialog.hide(this.tempEvents);
                    this.$mdDialog.cancel();
                };
                MasterSchedulerComponentController.prototype.cancel = function () {
                    this.$mdDialog.cancel();
                };
                MasterSchedulerComponentController.prototype.loadEvents = function () {
                    // using $timeout to make sure all changes are applied before reading visibleStart() and visibleEnd()
                    this.$timeout(function () {
                        //   var params = {
                        //    start: this.week.visibleStart().toString(),
                        //    end: this.week.visibleEnd().toString()
                        // }
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