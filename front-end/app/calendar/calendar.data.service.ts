export interface IPgCalendarDataService{
    data: any;
    setDayContent(date: Date, content: string);
}

export class PgCalendarData implements IPgCalendarDataService {

    data;
    constructor() {
        this.data = {};
    }

    static getDayKey(date: Date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("-");
    }

    setDayContent(date, content) {
        this.data[PgCalendarData.getDayKey(date)] = content || this.data[PgCalendarData.getDayKey(date)] || "";
    };
}