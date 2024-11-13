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

  createTimeOnly(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds, 0);
    return dateObj;
  }


  visits: Visit[] = [
    new Visit('1', new Date('2024-11-11'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-11'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-12'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-12'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-11'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-12'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-12'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-13'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-13'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-13'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-13'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-13'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    new Visit('1', new Date('2024-11-14'), '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),

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
      const dateDay = visit.date.toISOString().split('T')[0];
      if (!temp[dateDay]) {
        temp[dateDay] = [];
      }
      temp[dateDay].push(visit);
      return temp;
    }, {} as { [key: string]: Visit[] });
  }

}

