export let chooseFileButtonDirectiveName = 'chooseFileButton';
export function chooseFileButtonDirectiveFactory(){
    return {
        restrict: 'E',
        link: (scope, elem, attrs) => {
            let button = elem.find('button');
            let input = elem.find('input');
            input.css({display: 'none'});
            button.bind('click', () => {
                input[0].click();
            });
        }
    };
}