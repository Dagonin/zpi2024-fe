import { inject, Injectable, OnInit } from '@angular/core';
import { Visit } from './visit';
import { BarberService } from '../barber/barber.service';
import { SalonService } from '../Salon/salon.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {


  private salonService = inject(SalonService);
  private barberService = inject(BarberService);


  api_url = `http://localhost:8080/api/crud/visit`


  // TODO to chyba niepotrzebne
  createTimeOnly(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds, 0);
    return dateObj;
  }


  visits: Visit[] = [
    // new Visit('1', '2024-11-21', '10:15:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-21', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-21', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-22', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-23', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-26', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-27', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-28', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-25', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),
    // new Visit('1', '2024-11-24', '10:00:00', this.placeService.getPlace('1'), this.barberService.getBarber('1'), ['Strzyzenie', 'golenie brody']),

  ];



  constructor(private http: HttpClient) { }

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


  private getAllVisitsByCustomerID(customerID: string): Observable<Visit[]> {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<Visit[]>(`${this.api_url}/forCustomer/${customerID}`)

  }

  initializeVisitsByCustomerID(customerID: string): Observable<Visit[]> {
    return this.getAllVisitsByCustomerID(customerID).pipe(
      tap({
        next: (response: Visit[]) => {
          this.visits = response;
        },
        error: (error) => {
          console.error(error);
        }
      })
    );
  }



  private getAllVisitsByEmployeeID(employeeID: string): Observable<Visit[]> {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<Visit[]>(`${this.api_url}/forCustomer/${employeeID}`)

  }

  initializeVisitsByEmployeeID(employeeID: string): Observable<Visit[]> {
    return this.getAllVisitsByCustomerID(employeeID).pipe(
      tap({
        next: (response: Visit[]) => {
          this.visits = response;
        },
        error: (error) => {
          console.error(error);
        }
      })
    );
  }



}

