const template = ``;

export class TransformComponentController {

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

export let TransformComponentUrl ="/salon/transforms/:id?";
export let TransformComponentName = 'pgTransform';
export let TransformComponentOptions = {
    template: template,
    controller: TransformComponentController
};