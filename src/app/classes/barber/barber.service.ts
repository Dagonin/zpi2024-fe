import { Injectable } from '@angular/core';
import { Barber } from './barber';

@Injectable({
  providedIn: 'root'
})
export class BarberService {

  barbers : Barber[] = [
    new Barber('1','Daniel','Niezgoda',123123123,3900,4.2),
    new Barber('2','Daniel','Niezgoda',123123123,3900,4.2),
    new Barber('3','Daniel','Niezgoda',123123123,3900,4.2),
  ];

  constructor() { }

  getBarbers(){
    return this.barbers;
  }

  getBarber(id: string){
    return this.barbers[0];
  }

}
