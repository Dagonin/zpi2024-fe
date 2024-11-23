import { inject, Injectable } from '@angular/core';
import { BarberService } from '../barber/barber.service';
import { Salon } from './salon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SalonService {

    private barberService = inject(BarberService);

    salons: Salon[] = [];
    api_url = `http://localhost:8080/api/crud/salons`

    //   places: Place[] = [
    //     new Place('1', 'Kraków', '30-610', 'Konstantego Jelskiego 11', [49.99919, 19.94411], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')]),
    //     new Place('2', 'Katowice', '40-526', 'Meteorologów 13', [50.24043, 19.01211], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')]),
    //     new Place('3', 'Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')]),
    //     new Place('4', 'Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')]),
    //     new Place('5', 'Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')]),
    //     new Place('6', 'Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845], false, [this.barberService.getBarber('1'), this.barberService.getBarber('2')])
    //   ];

    constructor(private http: HttpClient) { }




    getSalons() {
        return this.salons;
    }


    getSalon(id: string) {
        return this.salons.find((salon) => salon.salonID == id)
    }


    getSalonsCities() {
        let salonCities: string[] = [];
        this.salons.forEach(salon => {
            salonCities.push(salon.salonCity)
        })
        return salonCities;
    }

    // TODO
    getPlaceBarbers(id: string) {
        // return place with correct id
        // return this.salons[0].barbers;
    }

    getPlaceTreeBarbers() {
        // let dataTree = new Map<string, string[]>();
        // this.places.forEach(place => {
        //     let barberList: string[] = [];
        //     place.barbers.forEach(barber => {
        //         barberList.push((barber.name + ' ' + barber.surname));

        //     })
        //     dataTree.set(place.city, barberList)
        // })
        // return dataTree;
        return new Map<string, string[]>()
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
            tap({
                next: (response: Salon[]) => {
                    this.salons = response;
                },
                error: (error) => {
                    console.error(error);
                }
            })
        );
    }




}
