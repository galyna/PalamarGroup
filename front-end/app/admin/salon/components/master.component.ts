const template = `master view`;

export class MasterComponentController {

    static $inject = [];

    constructor() {
    }

    $onInit() {
    }
}

export let MasterComponentUrl = "/salon/master/:id?";
export let MasterComponentName = "pgMaster";
export let MasterComponentOptions = {
    template: template,
    controller: MasterComponentController
};