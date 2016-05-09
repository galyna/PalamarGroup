System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CourseController;
    return {
        setters:[],
        execute: function() {
            CourseController = (function () {
                function CourseController($log, $routeParams, $location, courseService, orderService, mediaObserver) {
                    var _this = this;
                    this.$log = $log;
                    this.$location = $location;
                    this.orderService = orderService;
                    this.mediaObserver = mediaObserver;
                    courseService.get($routeParams.id).then(function (course) {
                        _this.course = course;
                    }).catch(function (err) {
                        $log.error(err);
                    });
                }
                CourseController.prototype.backToHome = function () {
                    this.$location.url('/home');
                };
                CourseController.prototype.submitOrder = function () {
                    var _this = this;
                    this.hideForm();
                    if (this.order.email || this.order.phone || this.order.name) {
                        this.order.event_id = this.course._id;
                        this.order.event_dates = this.course.courseModulesDates;
                        this.order.event_name = this.course.name;
                        this.order.date = new Date();
                        this.orderService.post(this.order)
                            .then(function () {
                            _this.hideForm();
                        })
                            .catch(function (err) {
                            _this.$log.error(err);
                        });
                    }
                };
                CourseController.prototype.showForm = function () {
                    this.formVisible = true;
                };
                CourseController.prototype.hideForm = function () {
                    this.formVisible = false;
                };
                ;
                CourseController.prototype.showMediaObserver = function () {
                    this.mediaObserver.observe();
                };
                CourseController.$inject = ['$log', '$routeParams', '$location', 'courseService', 'orderService', 'mediaObserver'];
                CourseController.componentName = 'CourseController';
                return CourseController;
            }());
            exports_1("CourseController", CourseController);
        }
    }
});
//# sourceMappingURL=course.controller.js.map