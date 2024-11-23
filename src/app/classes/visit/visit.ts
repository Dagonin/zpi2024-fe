import { Barber } from "../barber/barber";
import { Salon } from "../Salon/salon";
import { ServiceDTO } from "../service/serviceDTO";


export class Visit {
    id: string;
    date: string;
    startTime: string;
    salon: Salon;
    barber: Barber; // Zrobić obiekt pracownika
    rating?: number;
    // services: ServiceDTO[];
    services: string[];


    constructor(id: string, date: string, startTime: string, salon: Salon, barber: Barber, services: string[], rating?: number) {
        this.id = id;
        this.date = date;
        this.startTime = startTime;
        this.salon = salon;
        this.barber = barber;
        this.rating = rating;
        this.services = services;
    }
}

