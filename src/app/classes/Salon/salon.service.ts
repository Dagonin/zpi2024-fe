import { inject, Injectable } from '@angular/core';
import { Salon } from './salon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { OpeningHours } from './opening-hours';

@Injectable({
    providedIn: 'root'
})
export class SalonService {

    salons: Salon[] = [];
    salonMap: Map<number, Salon> = new Map();
    openingHours: OpeningHours[] = [];
    openingHoursMap: Map<number, OpeningHours[]> = new Map();
    api_url = `http://localhost:8080/api/crud/salons`
    opening_hours_api_url = `http://localhost:8080/api/crud/opening-hours`


    constructor(private http: HttpClient) { }




    getSalons() {
        return this.salons;
    }


    getSalon(id: number) {
        return this.salonMap.get(id);
    }

    getSalonMap() {
        return this.salonMap;
    }

    getOpeningHoursMap() {
        return this.openingHoursMap;
    }

    getSalonsCities() {
        let salonCities: string[] = [];
        this.salons.forEach(salon => {
            salonCities.push(salon.salonCity)
        })
        return salonCities;
    }



    getSalonById(salonId: string) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        return this.http.get<string>(`${this.api_url}/${salonId}`)
    }


    private getAllSalons(): Observable<Salon[]> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<Salon[]>(`${this.api_url}`, httpOptions);
    }

    initializeSalons(): Observable<Salon[]> {
        return this.getAllSalons().pipe(
            tap((response: Salon[]) => {
                this.salons = response;
                this.salonMap.clear();
                response.forEach((salon) => this.salonMap.set(salon.salonID, salon));
            }),
            catchError((error) => {
                console.error('Failed to initialize salons:', error);
                return throwError(() => new Error('Could not load salons'));
            })
        );
    }


    getAllOpeningHours(): Observable<OpeningHours[]> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<OpeningHours[]>(`${this.opening_hours_api_url}`, httpOptions);
    }

    initializeOpeningHours(): Observable<OpeningHours[]> {
        return this.getAllOpeningHours().pipe(
            tap((response: OpeningHours[]) => {
                this.openingHours = response;
                this.openingHoursMap.clear();

                response.forEach((openingHour) => {
                    const salonID = openingHour.salonID;
                    if (!this.openingHoursMap.has(salonID)) {
                        this.openingHoursMap.set(salonID, []);
                    }
                    this.openingHoursMap.get(salonID)?.push(openingHour);
                });
            }),
            catchError((error) => {
                console.error('Failed to initialize opening hours:', error);
                return throwError(() => new Error('Could not load opening hours'));
            })
        );
    }



}
