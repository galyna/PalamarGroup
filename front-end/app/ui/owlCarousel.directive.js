(function () {
    angular.module('ui')
        .directive('owlCarousel', ['$log', function($log){
            return {
                restrict: 'AE',
                link: function owlCarouselLink($scope, $element, $attrs){
                    if(!$ || !$.fn.owlCarousel) return $log.error('owlCarousel jquery plugin not found!');
                    $scope.initCarousel = function() {
                        // provide any default options you want
                        var defaultOptions = {
                            loop:true,
                            margin:10,
                            autoplay: true,
                            autoplaySpeed: 1000,
                            autoplayHoverPause: true,
                            nav:false,
                            responsive:{
                                0:{
                                    items:1
                                },
                                600:{
                                    items:3
                                },
                                1000:{
                                    items:5
                                }
                            }
                        };
                        var customOptions = $scope.$eval($($element).attr('owl-options')) || {};
                        // combine the two options objects
                        for(var key in customOptions) {
                            if(customOptions.hasOwnProperty(key)) {
                                defaultOptions[key] = customOptions[key];
                            }
                        }
                        // init carousel
                        $($element).owlCarousel(defaultOptions);
                    };
                }
            }
        }]);

    
})();