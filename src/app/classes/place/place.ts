import { Barber } from "../barber/barber";

export class Place {
    id: string;
    city: string;
    zipCode: string;
    street: string;
    coords: [number, number];
    checked: boolean;
    barbers: Barber[];

    constructor(id:string,city: string, zipCode: string, street: string, coords: [number, number],checked: boolean, barbers: Barber[]) {
      this.id = id;
      this.city = city;
      this.zipCode = zipCode;
      this.street = street;
      this.coords = coords;
      this.checked = checked;
      this.barbers = barbers
    }
}
