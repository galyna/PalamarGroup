const template = ``;

export class TransformsComponentController {

    static $inject = ['$mdDialog'];

    constructor(private $mdDialog:ng.material.IDialogService) {

    }
    showErrorDialog() {
        let confirm = this.$mdDialog.alert()
            .title( "Помилка" )
            .textContent( `Спробуйте будь ласка пізніше` )
            .ariaLabel( "Помилка" )
            .ok( 'OK' )
        return this.$mdDialog.show( confirm );

    }
}

export let TransformsComponentUrl = "/salon/transforms";
export let TransformsComponentName = 'pgTransforms';
export let TransformsComponentOptions = {
    template: template,
    controller: TransformsComponentController
};