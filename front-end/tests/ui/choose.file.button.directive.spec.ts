import {uiModule} from "../../app/ui/ui.module";
import {chooseFileButtonDirectiveName} from "../../app/ui/choose.file.button.directive";

describe(uiModule.name, () => {
        describe(chooseFileButtonDirectiveName, () => {

            let $scope, $compile;

            beforeEach(angular.mock.module('ui'));
            beforeEach(inject((_$rootScope_, _$compile_) => {
                $scope = _$rootScope_;
                $compile = _$compile_;
            }));

            let compile = (markup, scope) => {
                let el = $compile(markup)(scope);
                scope.$digest();
                return el;
            };

            it('should expose the controller to the view', inject(() => {
                let el = compile(
                `<choose-file-button>
                        <button>click me</button>
                        <input type="file" />
                    </choose-file-button>`, $scope);
                let clickEvent = document.createEvent('MouseEvent');
                clickEvent.initMouseEvent(
                    "click",
                    true /* bubble */, true /* cancelable */,
                    window, null,
                    0, 0, 0, 0, /* coordinates */
                    false, false, false, false, /* modifier keys */
                    0 /*left*/, null
                );
                let clickSpy = jasmine.createSpy('clickSpy');
                el.find('input').on('click', clickSpy);

                el.find('button')[0].dispatchEvent(clickEvent);

                expect(clickSpy).toHaveBeenCalled();
            }));


        });

});

