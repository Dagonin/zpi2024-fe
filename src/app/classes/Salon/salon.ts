export class Salon {
    salonID: string;
    salonName: string;
    salonDialNumber: string;
    salonCity: string;
    salonStreet: string;
    salonBuildingNumber: string;
    salonPostalCode: string;
    latitude: number;
    longitude: number;
    checked: boolean;

    constructor(
        salonID: string,
        salonName: string = '',
        salonDialNumber: string = '',
        salonCity: string = '',
        salonStreet: string = '',
        salonBuildingNumber: string = '',
        salonPostalCode: string = '',
        latitude: number,
        longitude: number,
        checked: boolean
    ) {
        this.salonID = salonID;
        this.salonName = salonName;
        this.salonDialNumber = salonDialNumber;
        this.salonCity = salonCity;
        this.salonStreet = salonStreet;
        this.salonBuildingNumber = salonBuildingNumber;
        this.salonPostalCode = salonPostalCode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.checked = false;
    }
}
