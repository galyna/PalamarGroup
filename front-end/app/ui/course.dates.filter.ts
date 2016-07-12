courseDatesFilter.$inject = ["dateFilter"];
export function courseDatesFilter(dateFilter: ng.IFilterDate){
    return function(input: any[], format = 'd.M.yy'){
        input.sort((a,b)=>{
            if(!(a instanceof Date)) a = new Date(a);
            if(!(b instanceof Date)) b = new Date(b);
            return a>b? 1: -1;
        });
        return `${dateFilter(input[0], format)}-${dateFilter(input[input.length-1], format)}`;
    }
}

export let courseDatesFilterName = 'courseDates';