const template = `masters view`;

export class MastersComponentController {

    static $inject = [];

    constructor() {
    }

    $onInit() {
    }
}

export let MastersComponentUrl = "/salon/masters";
export let MastersComponentName = "pgMasters";
export let MastersComponentOptions = {
    template: template,
    controller: MastersComponentController
};