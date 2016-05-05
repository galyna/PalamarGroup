System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CourseService;
    return {
        setters:[],
        execute: function() {
            CourseService = (function () {
                function CourseService($http, constants) {
                    this.$http = $http;
                    this.url = constants.apiUrl + '/course';
                }
                //TODO: implement filtering
                CourseService.prototype.get = function (id) {
                    var getUrl = id ? this.url + '/' + id : this.url;
                    return this.$http.get(getUrl).then(function (res) {
                        return res.data;
                    });
                };
                ;
                CourseService.$inject = ['$http', 'constants'];
                CourseService.componentName = 'courseService';
                return CourseService;
            }());
            exports_1("CourseService", CourseService);
        }
    }
});
//# sourceMappingURL=course.service.js.map