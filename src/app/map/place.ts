export class Place {
    city: string;
    zipCode: string;
    street: string;
    coords: [number, number];
    checked: boolean;

    constructor(city: string, zipCode: string, street: string, coords: [number, number],checked: boolean) {
      this.city = city;
      this.zipCode = zipCode;
      this.street = street;
      this.coords = coords;
      this.checked = checked;
    }
}
