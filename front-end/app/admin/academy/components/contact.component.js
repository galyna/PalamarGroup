System.register(["../../../resources/contact.resource", "../../../resources/photo.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var contact_resource_1, photo_service_1;
    var template, ContactComponentController, ContactComponentUrl, ContactComponentName, ContactComponentOptions;
    return {
        setters:[
            function (contact_resource_1_1) {
                contact_resource_1 = contact_resource_1_1;
            },
            function (photo_service_1_1) {
                photo_service_1 = photo_service_1_1;
            }],
        execute: function() {
            template = "<form name=\"saveForm\" novalidate ng-submit=\"$ctrl.save(saveForm)\" flex layout=\"column\">\n    <md-toolbar>\n        <div  class=\"md-toolbar-tools\">\n            <md-button class=\"md-icon-button\" ng-href=\"#/academy/contacts\">\n                <md-icon md-svg-src=\"navigation:ic_arrow_back_24px\"></md-icon>\n                <md-tooltip>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438 \u0430\u043A\u0430\u0434\u0435\u043C\u0456\u0457</md-tooltip>\n            </md-button>          \n    <md-subheader>\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438 \u0430\u043A\u0430\u0434\u0435\u043C\u0456\u0457</md-subheader>\n            <span flex></span>\n            <md-button ng-if=\"::$root.it.can('modifyAcademy')\" ng-click=\"$ctrl.cancel()\" ng-disabled=\"saveForm.$pristine\">\n                <span>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438</span>\n                <md-tooltip>\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0437\u043C\u0456\u043D\u0438</md-tooltip>\n            </md-button>\n            <md-button ng-if=\"::$root.it.can('modifyAcademy')\"  type=\"submit\" class=\"md-raised\">\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438</md-button>\n        </div>\n    </md-toolbar>\n    <md-tabs md-stretch-tabs=\"always\" md-dynamic-height>\n        <md-tab label=\"\u0406\u043D\u0444\u043E\">\n            <md-card>\n                <md-card-content>\n                    <md-input-container class=\"md-block \">\n                        <label for=\"name\">\u041D\u0430\u0437\u0432\u0430</label>\n                        <input ng-disabled=\"::!$root.it.can('modifyAcademy')\" id=\"name\" ng-model=\"$ctrl.contact.name\" name=\"name\"/>\n                    </md-input-container>\n                     <md-input-container>\n                        <label>\u0422\u0435\u043B\u0435\u0444\u043E\u043D</label>\n                        <input ng-disabled=\"::!$root.it.can('modifyAcademy')\" id=\"name\" ng-model=\"$ctrl.contact.phone\" name=\"name\"/>\n                    </md-input-container>\n                    <md-input-container>\n                        <label>Email</label>\n                        <input ng-disabled=\"::!$root.it.can('modifyAcademy')\" id=\"name\" ng-model=\"$ctrl.contact.email\" name=\"name\"/>\n                    </md-input-container>\n                     <md-input-container>\n                        <label>\u0410\u0434\u0440\u0435\u0441\u0430</label>\n                        <input ng-disabled=\"::!$root.it.can('modifyAcademy')\" id=\"name\" ng-model=\"$ctrl.contact.address\" name=\"name\"/>\n                    </md-input-container>\n                                 \n                </md-card-content>\n            </md-card>\n        </md-tab>\n        <md-tab label=\"\u0410\u0432\u0430\u0442\u0430\u0440\u043A\u0430\" flex>\n            <md-card>\n                <md-card-content layout=\"row\">\n                   \n                    <div >\n                        <img ng-src=\"{{$ctrl.contact.photo.url}}\" />\n                      </div>\n                        <div ng-if=\"::$root.it.can('modifyAcademy')\">\n                            <md-button ng-if=\"!$ctrl.showAuthorPhotoUpload\" class=\"md-raised\"\n                                       ng-click=\"$ctrl.showAuthorPhotoUpload=true\">\n                                \u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u0444\u043E\u0442\u043E\n                            </md-button>\n                            <div ng-if=\"$ctrl.showAuthorPhotoUpload\" class=\"md-padding md-margin\">\n                                <md-button ngf-select ng-model=\"hearFormsPhotoFile\" accept=\"image/*\" class=\"md-raised\">\n                                    \u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0444\u0430\u0439\u043B\n                                </md-button>\n                                <md-button class=\"md-primary\"\n                                           ng-click=\"$ctrl.uploadPhoto(croppedhearFormsPhotoFile, hearFormsPhotoFile.name,$ctrl.contact)\">\n                                    \u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438\n                                </md-button>\n                                <div ngf-drop ng-model=\"hearFormsPhotoFile\" ngf-pattern=\"image/*\"\n                                     class=\"cropArea\">\n                                    <img-crop area-type=\"rectangle\" result-image-size=\"{w:500,h:500}\" aspect-ratio=\"1\"\n                                              init-max-area=\"true\"\n                                              image=\"hearFormsPhotoFile  | ngfDataUrl\"\n                                              result-image=\"croppedhearFormsPhotoFile\"\n                                              ng-init=\"croppedhearFormsPhotoFile=''\">\n                                    </img-crop>\n                                </div>\n\n                            </div>\n                       \n                </md-card-content>\n            </md-card>\n        </md-tab>\n\n    </md-tabs>\n</form>";
            ContactComponentController = (function () {
                function ContactComponentController($log, $routeParams, $mdToast, $timeout, contactResource, constants, photoService, $mdDialog) {
                    this.$log = $log;
                    this.$routeParams = $routeParams;
                    this.$mdToast = $mdToast;
                    this.$timeout = $timeout;
                    this.contactResource = contactResource;
                    this.constants = constants;
                    this.photoService = photoService;
                    this.$mdDialog = $mdDialog;
                }
                ContactComponentController.prototype.$onInit = function () {
                    var _this = this;
                    if (this.$routeParams["id"]) {
                        this.contactResource.get({ id: this.$routeParams["id"] }).$promise
                            .then(function (favor) {
                            _this.originalContact = favor;
                            _this.contact = angular.copy(_this.originalContact);
                        }).catch(function (err) {
                            _this.$log.error(err);
                            _this.showErrorDialog();
                        });
                    }
                    else {
                        this.originalContact = new this.contactResource();
                        this.contact = angular.copy(this.originalContact);
                    }
                };
                ContactComponentController.prototype.uploadPhoto = function (dataUrl, name) {
                    var _this = this;
                    this.photoService.save(this.photoService.dataUrltoFile(dataUrl, name))
                        .then(function (url) {
                        _this.contact.photo = {
                            name: "",
                            url: url,
                            order: 0
                        };
                    }).catch(function (err) {
                        _this.showErrorDialog();
                        _this.$log.debug("fail upload file..." + err);
                    }).finally(function () {
                        _this.$timeout(function () {
                            _this.showPhotoUpload = false;
                        });
                    });
                };
                ;
                ContactComponentController.prototype.cancel = function () {
                    this.contact = angular.copy(this.originalContact);
                };
                ContactComponentController.prototype.save = function (form) {
                    var _this = this;
                    if (form.$invalid)
                        return;
                    this.contact.isAcademy = true;
                    this.contact.$save()
                        .then(function (favor) {
                        _this.$mdToast.showSimple("\u0414\u0430\u043D\u0456 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E");
                    })
                        .catch(function (err) {
                        _this.$log.error(err);
                        _this.showErrorDialog();
                    });
                };
                ContactComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                ContactComponentController.$inject = ["$log", "$routeParams", "$mdToast", "$timeout",
                    contact_resource_1.ContactResourceName, 'constants', photo_service_1.PhotoServiceName, "$mdDialog"];
                return ContactComponentController;
            }());
            exports_1("ContactComponentController", ContactComponentController);
            exports_1("ContactComponentUrl", ContactComponentUrl = "/academy/contact/:id?");
            exports_1("ContactComponentName", ContactComponentName = 'pgContact');
            exports_1("ContactComponentOptions", ContactComponentOptions = {
                template: template,
                controller: ContactComponentController
            });
        }
    }
});
//# sourceMappingURL=contact.component.js.map