import {MediaObserverFactory} from "./mediaObserver.service";
let app = angular.module('ui', [])
    .factory('mediaObserver', MediaObserverFactory);

export let uiModule = app;