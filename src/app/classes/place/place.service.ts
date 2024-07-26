import { Injectable } from '@angular/core';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  places: Place[] = [
    new Place('1','Kraków', '30-610', 'Konstantego Jelskiego 11', [49.99919, 19.94411],false),
    new Place('2','Katowice', '40-526', 'Meteorologów 13', [50.24043, 19.01211],false),
    new Place('3','Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845],false)
  ];

  constructor() { }

 


  getPlaces(){
    return this.places;
  }

  getPlace(id: string){
    // return place with correct id
    return this.places[1]
  }

}
