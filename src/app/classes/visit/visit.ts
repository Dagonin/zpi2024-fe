import { Barber } from "../barber/barber";
import { Place } from "../place/place";


export class Visit {
    id: string;
    date: Date;
    place: Place;
    barber: Barber; // Zrobić obiekt pracownika
    rating?: number;
    price: number;


    constructor(id:string, date: Date, place: Place, barber: Barber, price:number,rating?: number){
        this.id = id;
        this.date = date;
        this.place = place;
        this.barber = barber;
        this.rating = rating;
        this.price = price
    }
}

