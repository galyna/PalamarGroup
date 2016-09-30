System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var template, TransformComponentController, TransformComponentUrl, TransformComponentName, TransformComponentOptions;
    return {
        setters:[],
        execute: function() {
            template = "";
            TransformComponentController = (function () {
                function TransformComponentController($mdDialog) {
                    this.$mdDialog = $mdDialog;
                }
                TransformComponentController.prototype.showErrorDialog = function () {
                    var confirm = this.$mdDialog.alert()
                        .title("Помилка")
                        .textContent("\u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430 \u043F\u0456\u0437\u043D\u0456\u0448\u0435")
                        .ariaLabel("Помилка")
                        .ok('OK');
                    return this.$mdDialog.show(confirm);
                };
                TransformComponentController.$inject = ['$mdDialog'];
                return TransformComponentController;
            }());
            exports_1("TransformComponentController", TransformComponentController);
            exports_1("TransformComponentUrl", TransformComponentUrl = "/salon/transforms/:id?");
            exports_1("TransformComponentName", TransformComponentName = 'pgTransform');
            exports_1("TransformComponentOptions", TransformComponentOptions = {
                template: template,
                controller: TransformComponentController
            });
        }
    }
});
//# sourceMappingURL=transform.component.js.map