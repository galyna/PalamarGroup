/**
 * Created by Galyna on 12.11.2016.
 */

export interface ISchedulerService {
    getWeekConfig(): any;
    getNavigatorSmallConfig(): any;
    getNavigatorConfig(): any;
    getStartAndEndOfWeek(date): Date[]
}

export let SchedulerServiceName = 'SchedulerService'
export class SchedulerService implements ISchedulerService {

    static $inject = [];

    constructor() {

    }
    getStartAndEndOfWeek(date): Date[] {
        date = new Date(date);
        date.setUTCHours(0);
        var day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        var start = new Date(date.setDate(diff));
        var end = new Date(date.setDate(start.getDate() + 7));
        return [start, end];
    }

    getWeekConfig(): any {
        return {
            visible: true,
            viewType: "Week",
            angularAutoApply: true,
            locale: "uk-ua",
            cellHeight: "32",
            businessBeginsHour: "10",
            businessEndsHour: "19",
            hideUntilInit: true,
            headerDateFormat: 'dd.MM',
            eventMoveHandling: 'Disabled',
            eventResizeHandling: 'Disabled',
            heightSpec: 'BusinessHours',

        }
    }

    getNavigatorSmallConfig(): any {
        return {
            selectMode: "week",
            showMonths: 1,
            skipMonths: 1,
            locale: "uk-ua",
            cellHeight: "40",
            cellWidth: "40",
            startDate:new Date()
        }
    }

    getNavigatorConfig(): any {
        return {
            selectMode: "week",
            showMonths: 3,
            skipMonths: 3,
            locale: "uk-ua",
            cellHeight: "26.5",
            cellWidth: "26",
            startDate:new Date()
        }
    }
}


