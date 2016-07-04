let template = `
<p><strong ng-bind="$ctrl.current"></strong> of <strong ng-bind="$ctrl.total"></strong> 
<md-button ng-click="$ctrl.prev()" ng-disabled="$ctrl.prevDisabled" class="md-icon-button md-raised" aria-label="Previous">
        <md-icon md-svg-icon="navigation:ic_chevron_left_24px"></md-icon>
</md-button>
<md-button ng-click="$ctrl.next()" ng-disabled="$ctrl.nextDisabled" class="md-icon-button md-raised" aria-label="Next">
    <md-icon md-svg-icon="navigation:ic_chevron_right_24px"></md-icon>
</md-button>
</p>
`;

export interface IAdminPagingParams {
    total:number,
    page:number,
    perPage:number
}

export class AdminPagingComponentController {

    //bindings
    params:IAdminPagingParams;
    onPrev:() => void;
    onNext:() => void;

    current:string;
    total:string;
    prevDisabled:boolean;
    nextDisabled:boolean;

    $onChanges(changes) {
        this.params = changes.params.currentValue;
        if (!this.params) return;
        this.total = this.params.total + '';
        if (this.params.perPage > 1) {
            this.current = this.getCurrentPlural(this.params.page, this.params.perPage, this.params.total);
        } else {
            this.current = this.getCurrentSingular(this.params.page, this.params.perPage);
        }

        this.prevDisabled = this.params.page <= 1;
        this.nextDisabled = this.isLastPage(this.params.page, this.params.perPage, this.params.total);
    }

    //noinspection JSMethodCanBeStatic
    isLastPage(page:number, perPage:number, total:number) {
        return (total - (page - 1) * perPage + 1) < perPage;
    }

    //noinspection JSMethodCanBeStatic
    getCurrentPlural(page:number, perPage:number, total:number) {
        let first = (page - 1) * perPage + 1;
        let last = first + perPage - 1;
        //last page
        let reminder = total - first;
        if (this.isLastPage(page, perPage, total)) {
            last = first + reminder;
        }
        return first + '-' + last;
    }

    //noinspection JSMethodCanBeStatic
    getCurrentSingular(page:number, perPage:number) {
        return page * perPage + '';
    }

    prev() {
        this.onPrev();
    }

    next() {
        this.onNext();
    }
}

export let adminPagingComponentName = 'pgAdminPaging';
export let adminPagingComponentOptions:ng.IComponentOptions = {
    template: template,
    controller: AdminPagingComponentController,
    bindings: {
        "params": "<",
        "onPrev": "&",
        "onNext": "&"
    }
};

export interface IPagingHelperParams {
    page?:number,
    perPage?:number,
    total?:number
}

export let PagingServiceName = 'pagingService';
export class PagingService {

    private _params:IPagingHelperParams;

    constructor() {
        this._params = {};
    }

    update(params:IPagingHelperParams) {
        angular.extend(this._params, params);
        return this;
    }

    params() {
        return this._params;
    }

    currentPage() {
        return this._params.page;
    }

    prevPage() {
        return this._params.page - 1;
    }

    nextPage() {
        return this._params.page + 1;
    }

    parseHeaders(headers:ng.IHttpHeadersGetter) {
        return {
            total: parseInt(headers('x-total-count')) || 0,
            perPage: parseInt(headers('x-per-page')) || 0,
            page: parseInt(headers('x-page')) || 1
        }
    }
}