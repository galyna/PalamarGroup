/**
 * Created by Galyna on 16.03.2016.
 */
(function () {
    'use strict';
    function CompareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }

    angular.module('users')
        .directive('compareTo',CompareTo );


})();
