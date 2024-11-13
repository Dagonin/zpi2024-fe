import { Barber } from "../barber/barber";
import { Place } from "../place/place";
import { ServiceDTO } from "../service/serviceDTO";


export class Visit {
    id: string;
    date: Date;
    startTime: string;
    place: Place;
    barber: Barber; // Zrobić obiekt pracownika
    rating?: number;
    // services: ServiceDTO[];
    services: string[];


    constructor(id: string, date: Date, startTime: string, place: Place, barber: Barber, services: string[], rating?: number) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.place = place;
        this.barber = barber;
        this.rating = rating;
        this.services = services;
    }
}

