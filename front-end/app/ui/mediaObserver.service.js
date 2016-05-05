System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function MediaObserverFactory($compile, $rootScope, $templateCache) {
        var $scope = $rootScope.$new(true);
        $scope.vm = {
            prev: prev,
            next: next,
            close: close,
            isVideo: isVideo,
            img: {}
        };
        var test = $templateCache.get('ui/mediaObserver.html');
        var templateEl = angular.element(test);
        var element = $compile(templateEl)($scope);
        var body = angular.element(document.body);
        body.prepend(element);
        function prev() {
            $scope.vm.index = $scope.vm.index <= 0 ? $scope.vm.items.length - 1 : $scope.vm.index - 1;
            $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
        }
        function next() {
            $scope.vm.index = $scope.vm.index >= $scope.vm.items.length - 1 ? 0 : $scope.vm.index + 1;
            $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
        }
        function close() {
            $scope.items = null;
            element.removeClass('visible');
            body.removeClass('media-observer active');
        }
        //TODO: implement
        function isVideo() {
            // return $scope.vm.img.current.type == 'video';
            return false;
        }
        return {
            observe: function (items, index) {
                $scope.vm.index = index || 0;
                $scope.vm.items = items;
                $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
                element.addClass('visible');
                body.addClass('media-observer active');
            },
            close: close
        };
    }
    exports_1("MediaObserverFactory", MediaObserverFactory);
    return {
        setters:[],
        execute: function() {
            MediaObserverFactory.$inject = ['$compile', '$rootScope', '$templateCache'];
        }
    }
});
//# sourceMappingURL=mediaObserver.service.js.map