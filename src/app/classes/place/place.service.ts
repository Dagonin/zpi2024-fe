import { inject, Injectable } from '@angular/core';
import { Place } from './place';
import { BarberService } from '../barber/barber.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private barberService = inject(BarberService);

  places: Place[] = [
    new Place('1','Kraków', '30-610', 'Konstantego Jelskiego 11', [49.99919, 19.94411],false,[this.barberService.getBarber('1'),this.barberService.getBarber('2')]),
    new Place('2','Katowice', '40-526', 'Meteorologów 13', [50.24043, 19.01211],false,[this.barberService.getBarber('1'),this.barberService.getBarber('2')]),
    new Place('3','Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845],false,[this.barberService.getBarber('1'),this.barberService.getBarber('2')])
  ];

  constructor() { }

 


  getPlaces(){
    return this.places;
  }

  getPlacesCities(){
    let placeCities : string[] = [];
    this.places.forEach(place=>{
      placeCities.push(place.city)
    })
    return placeCities;
  }

  getPlaceBarbers(id: string){
       // return place with correct id
    return this.places[1].barbers;
  }

  getPlaceTreeBarbers(){
    let dataTree = new Map<string, string[]>();
    this.places.forEach(place=>{
      let barberList : string[] = [];
      place.barbers.forEach(barber=>{
        barberList.push((barber.name + ' ' + barber.surname));
        
      })
      dataTree.set(place.city,barberList)
    })
    return dataTree;
  }

  getPlace(id: string){
    // return place with correct id
    return this.places[1]
  }

}
