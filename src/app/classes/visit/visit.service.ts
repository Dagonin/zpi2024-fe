import { inject, Injectable, OnInit } from '@angular/core';
import { Visit } from './visit';
import { PlaceService } from '../place/place.service';
import { BarberService } from '../barber/barber.service';
import { Place } from '../place/place';

@Injectable({
  providedIn: 'root'
})
export class VisitService {


  private placeService = inject(PlaceService);
  private barberService = inject(BarberService);


  // TODO to chyba niepotrzebne
  createTimeOnly(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds, 0);
    return dateObj;
  }


  visits: Visit[] = [
    new Visit('1', '2024-11-21', '10:15:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-21', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-21', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),

  ];



  constructor() { }

  getVisits() {
    return this.visits;
  }

  getVisit(id: string) {
    return this.visits[0];
  }

  groupVisitsByDate(visits: Visit[]) {
    return visits.reduce((temp, visit) => {
      if (!temp[visit.date]) {
        temp[visit.date] = [];
      }
      temp[visit.date].push(visit);
      return temp;
    }, {} as { [key: string]: Visit[] });
  }

}

