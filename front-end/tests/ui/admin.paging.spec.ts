import {uiModule} from "../../app/ui/ui.module";
import {
    adminPagingComponentName, AdminPagingComponentController, IAdminPagingParams, PagingService, PagingServiceName
} from "../../app/ui/admin.paging";

describe(uiModule.name + " module", () => {
    describe(adminPagingComponentName, () => {
        let $componentController: ng.IComponentControllerService,
            pagingComponent: AdminPagingComponentController;

        beforeEach(() => {
            angular.mock.module(uiModule.name);
        });

        beforeEach(inject(($injector) => {
            $componentController = $injector.get('$componentController');
        }));

        function getPagingComponent(params?: IAdminPagingParams, onPrevSpy?: jasmine.Spy, onNextSpy?: jasmine.Spy){
            return $componentController
            <AdminPagingComponentController, {params: IAdminPagingParams, onPrev: jasmine.Spy, onNext: jasmine.Spy}>
            (adminPagingComponentName,
                null,
                {params: params, onPrev: onPrevSpy, onNext: onNextSpy}
            );
        }

        it("this.current should list first and last item indexes [1-10]", () => {
            let params = {total: 25, page: 1, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.current).toBe("1-10");
        });

        it("this.current should list first and last item indexes [11-20]", () => {
            let params = {total: 25, page: 2, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.current).toBe("11-20");
        });

        it("this.current should list first and last item indexes[21-25]", () => {
            let params = {total: 25, page: 3, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.current).toBe("21-25");
        });

        it("this.current should be equal to page if perPage=1", () => {
            let params = {total: 25, page: 3, perPage: 1};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.current).toBe("3");
        });

        it("this.total should be params.total", () => {
            let params = {total: 25, page: 1, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.total).toBe("25");
        });

        it("this.prevDisabled=true, this.nextDisabled=false if 1-st page", () => {
            let params = {total: 25, page: 1, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.prevDisabled).toBe(true);
            expect(pagingComponent.nextDisabled).toBe(false);
        });

        it("this.prevDisabled=false, this.nextDisabled=true if last page", () => {
            let params = {total: 25, page: 3, perPage: 10};
            pagingComponent = getPagingComponent(params);
            pagingComponent.$onChanges({params:{currentValue:params}});

            expect(pagingComponent.prevDisabled).toBe(false);
            expect(pagingComponent.nextDisabled).toBe(true);
        });

        it("this.isLastPage() should return true if last page", () => {
            let params = {total: 25, page: 3, perPage: 10};
            pagingComponent = getPagingComponent(params);

            expect(pagingComponent.isLastPage(params.page, params.perPage, params.total)).toBe(true);
        });

        it("this.isLastPage() should return false if not last page", () => {
            let params = {total: 25, page: 1, perPage: 10};
            pagingComponent = getPagingComponent(params);

            expect(pagingComponent.isLastPage(params.page, params.perPage, params.total)).toBe(false);
        });

        it("this.isLastPage() should return true if last page, false otherwise", () => {
            let params = {total: 25, page: 3, perPage: 10};
            pagingComponent = getPagingComponent(params);

            expect(pagingComponent.isLastPage(params.page, params.perPage, params.total)).toBe(true);
        });

        it("this.prev should call onPrev", () => {
            let params = {total: 25, page: 3, perPage: 10};
            let onPrevSpy = jasmine.createSpy('onPrevSpy');
            pagingComponent = getPagingComponent(params, onPrevSpy);

            pagingComponent.prev();
            expect(onPrevSpy).toHaveBeenCalled();
        });

        it("this.next should call onNext", () => {
            let params = {total: 25, page: 3, perPage: 10};
            let onNextSpy = jasmine.createSpy('onNextSpy');
            pagingComponent = getPagingComponent(params, onNextSpy);

            pagingComponent.prev();
            expect(onNextSpy).toHaveBeenCalled();
        });

    });

    describe(PagingServiceName, () => {
        let pagingService: PagingService;

        beforeEach(() => {
            angular.mock.module(uiModule.name);
        });

        beforeEach(inject(($injector) => {
            pagingService = $injector.get(PagingServiceName);
        }));

        it("update should extend service params", () => {
            let params = {total: 100, page: 1, perPage: 10};

            pagingService.update(params);

            expect(pagingService.params()).toEqual(params);
        });

        // it("parseHeaders should return parsed headers", () => {
        //     let headersSpy = jasmine.createSpy().and.returnValue
        //     let headersGetter = (name?: string) => {
        //         if(!name) return {[name]: "val"};
        //         switch(name){
        //             case "x-total-count":
        //                 return "100";
        //             case "x-page":
        //                 return "1";
        //             case "x-per-page":
        //                 return "10";
        //         }
        //     };
        //
        //     let {total, page, perPage} = pagingService.parseHeaders(headersGetter);
        //
        //     expect(total).toBe(100);
        //     expect(page).toBe(1);
        //     expect(perPage).toBe(10);
        // });
        //
        // it("parseHeaders should return default values if no headers present", () => {
        //     let headersGetter = (name?: string) => {
        //         if(!name) return {};
        //         return "";
        //     };
        //
        //     let {total, page, perPage} = pagingService.parseHeaders(headersGetter);
        //
        //     expect(total).toBe(0);
        //     expect(page).toBe(1);
        //     expect(perPage).toBe(0);
        // });
    })
});