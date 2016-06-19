import 'angular';
import {constants, debugConfig, materialConfig} from "./core.config";
import {httpInterceptorConfig} from "./core.interceptor";
import {coreRun} from "./core.run";

export let coreModule = angular.module('core', [])
    .constant('constants', constants)
    .config(debugConfig)
    .config(materialConfig)
    .config(httpInterceptorConfig)
    .run(coreRun);