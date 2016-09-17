System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var template, TransformComponentController, TransformComponentUrl, TransformComponentName, TransformComponentOptions;
    return {
        setters:[],
        execute: function() {
            template = "";
            TransformComponentController = (function () {
                function TransformComponentController() {
                }
                TransformComponentController.$inject = [];
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