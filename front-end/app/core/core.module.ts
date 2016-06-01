import 'angular';
import {constants} from "./core.config";

export let coreModule = angular.module('core', [])
.constant('constants', constants);