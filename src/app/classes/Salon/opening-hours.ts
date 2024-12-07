export class OpeningHours {
    openingHoursID: number;
    weekday: number;
    openingHour: string;
    closingHour: string;
    salonID: number;

    constructor(
        openingHoursID: number,
        weekday: number,
        openingHour: string,
        closingHour: string,
        salonID: number
    ) {
        this.openingHoursID = openingHoursID;
        this.weekday = weekday;
        this.openingHour = openingHour;
        this.closingHour = closingHour;
        this.salonID = salonID;
    }
}