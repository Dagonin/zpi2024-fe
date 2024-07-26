export class Barber {
    id: string;
    name: string;
    surname: string;
    phone_number: number;
    wage: number;
    rating: number;

    constructor(id:string,name: string, surname: string, phone_number:number, wage:number, rating:number){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phone_number = phone_number;
        this.wage = wage;
        this.rating = rating;
    }
}


