System.register(["../../../resources/transform.resource", "../../../resources/photo.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var transform_resource_1, photo_service_1;
    var template, TransformComponentController, TransformComponentUrl, TransformComponentName, TransformComponentOptions;
    return {
        setters:[
            function (transform_resource_1_1) {
                transform_resource_1 = transform_resource_1_1;
            },
            function (photo_service_1_1) {
                photo_service_1 = photo_service_1_1;
            }],
        execute: function() {
            template = "<form name=\"saveForm\" novalidate ng-submit=\"$ctrl.save(saveForm)\" flex layout=\"column\">\n    <md-toolbar>\n        <div class=\"md-toolbar-tools\">\n            <md-button class=\"md-icon-button\" ng-href=\"#/salon/favors\">\n                <md-icon md-svg-src=\"navigation:ic_arrow_back_24px\"></md-icon>\n                <md-tooltip>\u041F\u0435\u0440\u0440\u0435\u0432\u0442\u0456\u043B\u0435\u043D\u043D\u044F</md-tooltip>\n            </md-button>\n            <md-subheader>\u041F\u0435\u0440\u0440\u0435\u0432\u0442\u0456\u043B\u0435\u043D\u043D\u044F</md-subheader>\n            <span flex></span>\n            <md-button ng-if=\"::$root.it.can('modifySalon')\" ng-click=\"$ctrl.cancel()\" ng-disabled=\"saveForm.$pristine\">\n                <span>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</span>\n                <md-tooltip>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0437\u043C\u0456\u043D\u0438</md-tooltip>\n            </md-button>\n            <md-button ng-if=\"::$root.it.can('modifySalon')\" type=\"submit\" class=\"md-raised\">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</md-button>\n        </div>\n    </md-toolbar>\n    <md-tabs md-stretch-tabs=\"always\" md-dynamic-height>\n        <md-tab label=\"\u0406\u043D\u0444\u043E\">\n            <md-card>\n                <md-card-content>\n                    <md-input-container class=\"md-block \">\n                        <label for=\"name\">\u041D\u0430\u0437\u0432\u0430</label>\n                        <input id=\"name\" ng-disabled=\"::!$root.it.can('modifySalon')\" ng-model=\"$ctrl.transform.name\" name=\"name\"/>\n                    </md-input-container>\n                          <md-input-container class=\"md-block  \">\n                                    <label for=\"ord\">\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F</label>\n                                    <input ng-disabled=\"::!$root.it.can('modifySalon')\" id=\"ord\" ng-model=\"$ctrl.transform.order\" type=\"number\"/>\n                                </md-input-container>\n                </md-card-content>\n            </md-card>\n        </md-tab>\n        <md-tab label=\"\u0424\u043E\u0442\u043E\" flex>\n            <md-card>\n                <md-card-content>\n                    <div flex>\n                        <div class=\"md-padding md-margin\" layout=\"row\"\n                             ng-repeat=\"item in $ctrl.transform.photos track by $index\"\n                             ng-click=\"null\">\n                            <img ng-src=\"{{item.url}}\" class=\"module-history-img\"/>\n                            <div layout=\"column\" ng-if=\"::$root.it.can('modifySalon')\">\n                                <md-input-container class=\"md-block  \">\n                                    <label for=\"historyNme\">\u041D\u0430\u0437\u0432\u0430 </label>\n                                    <input id=\"historyNme\" ng-model=\"item.name\" name=\"historyNme\"/>\n                                </md-input-container>\n                                <md-input-container class=\"md-block  \">\n                                    <label for=\"ord\">\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F</label>\n                                    <input id=\"ord\" ng-model=\"item.order\" type=\"number\"/>\n                                </md-input-container>\n                                <md-button class=\"  md-raised\"\n                                           ng-click=\"$ctrl.deleteFromList($ctrl.transform.photos ,item)\">\n                                    \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n                                </md-button>\n                            </div>\n                        </div>\n                    </div>\n                    <div ng-if=\"::$root.it.can('modifySalon')\">\n                        <md-button ng-if=\"!$ctrl.showFormPhotoUpload\" class=\"md-raised\"\n                                   ng-click=\"$ctrl.showFormPhotoUpload=true\">\n                            \u0414\u043E\u0434\u0430\u0442\u0438 \u0444\u043E\u0442\u043E\n                        </md-button>\n                        <div ng-if=\"$ctrl.showFormPhotoUpload\" class=\"md-padding md-margin\">\n                            <md-button ngf-select ng-model=\"masrerNewWork\" accept=\"image/*\" class=\"md-raised\">\n                                \u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0444\u0430\u0439\u043B\n                            </md-button>\n                            <md-button class=\"md-primary\" ng-show=\"masrerNewWork\"\n                                       ng-click=\"$ctrl.uploadCollPhoto(croppedhearFormsPhotoFile, masrerNewWork.name,$ctrl.transform.photos)\">\n                                \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438\n                            </md-button>\n                            <div ngf-drop ng-model=\"masrerNewWork\" ngf-pattern=\"image/*\"\n                                 class=\"cropArea\">\n                                <img-crop area-type=\"rectangle\" result-image-size=\"{w:400,h:400}\" aspect-ratio=\"1\"\n                                          init-max-area=\"true\"\n                                          image=\"masrerNewWork  | ngfDataUrl\"\n                                          result-image=\"croppedhearFormsPhotoFile\"\n                                          ng-init=\"croppedhearFormsPhotoFile=''\">\n                                </img-crop>\n                            </div>\n\n                        </div>\n                    </div>\n                </md-card-content>\n            </md-card>\n        </md-tab>\n        <md-tab label=\"\u0412\u0456\u0434\u0435\u043E\" flex>\n            <md-card>\n                <md-card-content layout=\"row\">\n                    <div flex=\"60\">\n                        <md-subheader class=\"md-no-sticky\">\u0412\u0456\u0434\u0435\u043E</md-subheader>\n                        <div class=\"md-padding md-margin\"\n                             ng-repeat=\"item in $ctrl.transform.videos track by $index\"\n                             ng-click=\"null\">\n                            <div class=\"embed-responsive embed-responsive-16by9\">\n                                <youtube-video class=\"embed-responsive-item\" player-vars=\"{showinfo: 0}\"\n                                               video-id=\"item.url\"></youtube-video>\n                            </div>\n                            <div layout=\"column\" ng-if=\"::$root.it.can('modifySalon')\">\n                                <md-input-container class=\"md-block  \">\n                                    <label for=\"historyNme\">\u041D\u0430\u0437\u0432\u0430 \u0432\u0456\u0434\u0435\u043E</label>\n                                    <input id=\"historyNme\" ng-model=\"item.name\" name=\"historyNme\"/>\n                                </md-input-container>\n                                <md-input-container class=\"md-block  \">\n                                    <label for=\"ord\">\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F</label>\n                                    <input id=\"ord\" ng-model=\"item.order\" type=\"number\"/>\n                                </md-input-container>\n                                <md-button class=\"  md-raised\"\n                                           ng-click=\"$ctrl.deleteFromList($ctrl.transform.videos,item)\">\n                                    \u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438\n                                </md-button>\n                            </div>\n                        </div>\n                    </div>\n                    <div flex ng-if=\"::$root.it.can('modifySalon')\">\n                        <md-input-container class=\"md-block  \">\n                            <label for=\"videoId\">ID</label>\n                            <input id=\"videoId\" ng-model=\"videoId\" name=\"videoId\"/>\n                        </md-input-container>\n                        <md-button class=\"md-raised\" ng-if=\"::$root.it.can('modifySalon')\"\n                                   ng-click=\"$ctrl.addVideo(videoId)\">\n                            \u0414\u043E\u0434\u0430\u0442\u0438 \u0432\u0456\u0434\u0435\u043E\n                        </md-button>\n\n                    </div>\n                </md-card-content>\n            </md-card>\n        </md-tab>\n    </md-tabs>\n</form>";
            TransformComponentController = (function () {
                function TransformComponentController($log, $routeParams, $mdToast, $timeout, $mdDialog, transformResource, constants, photoService) {
                    this.$log = $log;
                    this.$routeParams = $routeParams;
                    this.$mdToast = $mdToast;
                    this.$timeout = $timeout;
                    this.$mdDialog = $mdDialog;
                    this.transformResource = transformResource;
                    this.constants = constants;
                    this.photoService = photoService;
                }
                TransformComponentController.prototype.$onInit = function () {
                    var _this = this;
                    if (this.$routeParams["id"]) {
                        this.transformResource.get({ id: this.$routeParams["id"] }).$promise
                            .then(function (favor) {
                            _this.originalTransform = favor;
                            _this.transform = angular.copy(_this.originalTransform);
                        });
                    }
                    else {
                        this.originalTransform = new this.transformResource();
                        this.transform = angular.copy(this.originalTransform);
                    }
                };
                //TODO: add file param type
                TransformComponentController.prototype.uploadCollPhoto = function (dataUrl, name, collection) {
                    var _this = this;
                    this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name)).then(function (url) {
                        collection.push({
                            name: "",
                            url: url,
                            order: 0
                        });
                    }).catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    }).finally(function () {
                        _this.showWorkUpload = false;
                    });
                };
                TransformComponentController.prototype.addVideo = function (id) {
                    var _this = this;
                    this.transform.videos.push({
                        name: "",
                        url: id,
                        order: 0
                    });
                    this.transform.$save()
                        .then(function (course) {
                        _this.$mdToast.showSimple("\u043A\u0443\u0440\u0441 " + course.name + " \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E");
                    })
                        .catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                TransformComponentController.prototype.deleteFromList = function (list, item) {
                    list.splice(list.indexOf(item), 1);
                };
                TransformComponentController.prototype.cancel = function () {
                    this.transform = angular.copy(this.originalTransform);
                };
                TransformComponentController.prototype.save = function (form) {
                    var _this = this;
                    if (form.$invalid)
                        return;
                    this.transform.$save()
                        .then(function (favor) {
                        _this.$mdToast.showSimple("\u0414\u0430\u043D\u0456 \u043F\u0435\u0440\u0435\u0432\u0442\u0456\u043B\u0435\u043D\u043D\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E");
                    })
                        .catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                TransformComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                TransformComponentController.$inject = ["$log", "$routeParams", "$mdToast", "$timeout", '$mdDialog',
                    transform_resource_1.TransformResourceName, 'constants', photo_service_1.PhotoServiceName];
                return TransformComponentController;
            }());
            exports_1("TransformComponentController", TransformComponentController);
            exports_1("TransformComponentUrl", TransformComponentUrl = "/salon/transform/:id?");
            exports_1("TransformComponentName", TransformComponentName = 'pgTransform');
            exports_1("TransformComponentOptions", TransformComponentOptions = {
                template: template,
                controller: TransformComponentController
            });
        }
    }
});
//# sourceMappingURL=transform.component.js.map