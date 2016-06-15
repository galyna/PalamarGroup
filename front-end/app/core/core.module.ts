import 'angular';
import {constants} from "./core.config";
import {httpInterceptorConfig} from "./core.interceptor";

export let coreModule = angular.module('core', [])
.constant('constants', constants)
    .config(httpInterceptorConfig);