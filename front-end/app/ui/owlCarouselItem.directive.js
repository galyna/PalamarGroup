(function () {
    angular.module('ui')
        .directive('owlCarouselItem', ['$log', function($log){
            return {
                restrict: 'AE',
                link: function owlCarouselItemLink($scope){
                    if(!$ || !$.fn.owlCarousel) return $log.error('owlCarousel jquery plugin not found!');
                    // wait for the last item in the ng-repeat then call init
                    if($scope.$last) {
                        $scope.initCarousel();
                    }
                }
            }
        }]);
    

})();