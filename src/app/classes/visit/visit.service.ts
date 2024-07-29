import { inject, Injectable, OnInit } from '@angular/core';
import { Visit } from './visit';
import { PlaceService } from '../place/place.service';
import { BarberService } from '../barber/barber.service';
import { Place } from '../place/place';

@Injectable({
  providedIn: 'root'
})
export class VisitService  {


  private placeService = inject(PlaceService);
  private barberService = inject(BarberService);

  visits : Visit[] = [
    new Visit('1',new Date(),this.placeService.getPlace('1'),this.barberService.getBarber('1'),40),
    new Visit('1',new Date(),this.placeService.getPlace('1'),this.barberService.getBarber('1'),40),
    new Visit('1',new Date(),this.placeService.getPlace('1'),this.barberService.getBarber('1'),40),
  ];



  constructor() { }

  getVisits(){
    return this.visits;
  }

  getVisit(id: string){
    return this.visits[0];
  }

}

