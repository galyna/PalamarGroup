//TODO: refactor
import {IRootScope} from "../../typings";

export interface IMediaObserverFactory {
    observe(items:string[], index:number, socialParams:any):void;
    close():void;
}
interface IScope extends ng.IScope {
    vm:any,
    items:string[];
}

export let MediaObserverFactoryName = 'mediaObserver';
MediaObserverFactory.$inject = ['$compile', '$rootScope', '$templateCache'];
export function MediaObserverFactory($compile:ng.ICompileService, $rootScope:IRootScope,
                                     $templateCache:ng.ITemplateCacheService) {
    var $scope = <IScope>$rootScope.$new( true );
    $scope.vm = {
        prev: prev,
        next: next,
        close: close,
        isVideo: isVideo,
        img: {},
        socialParams: {}
    };
    var test = <string>$templateCache.get( 'app/ui/mediaObserver.html' );
    var templateEl = angular.element( test );
    var element = $compile( templateEl )( $scope );
    var body = angular.element( document.body );
    body.prepend( element );

    function prev() {
        $scope.vm.index = $scope.vm.index <= 0 ? $scope.vm.items.length - 1 : $scope.vm.index - 1;
        $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
        $scope.vm.socialParams.image = $scope.vm.socialParams.host + $scope.vm.img.current.url;
        $scope.vm.socialParams.description = $scope.vm.img.current.name;
    }

    function next() {
        $scope.vm.index = $scope.vm.index >= $scope.vm.items.length - 1 ? 0 : $scope.vm.index + 1;
        $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
        $scope.vm.socialParams.image = $scope.vm.socialParams.host + $scope.vm.img.current.url;
        $scope.vm.socialParams.description = $scope.vm.img.current.name;
    }

    function close() {
        $scope.items = null;
        element.removeClass( 'visible' );
        body.removeClass( 'media-observer active' );
    }

    //TODO: implement
    function isVideo() {
        // return $scope.vm.img.current.type == 'video';
        return false;
    }

    return <IMediaObserverFactory>{
        observe: (items, index = 0, socialParams) => {
            $scope.vm.index = index;
            $scope.vm.items = items;
            $scope.vm.img.current = $scope.vm.items[$scope.vm.index];
            $scope.vm.socialParams = socialParams;
            $scope.vm.socialParams.image = $scope.vm.socialParams.host + $scope.vm.img.current.url;
            $scope.vm.socialParams.description = $scope.vm.img.current.name;
            element.addClass( 'visible' );
            body.addClass( 'media-observer active' );
        },
        close: close
    }
}