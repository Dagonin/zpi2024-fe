import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Rating } from './rating';

@Injectable({
    providedIn: 'root'
})
export class RatingService {


    // employees: Employee[] = [];

    api_url = `http://localhost:8080/api/crud/rating`

    constructor(private http: HttpClient) { }



    getAverageRatingForEmployee(employeeID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<Rating>(`${this.api_url}/avgForEmployee/${employeeID}`, httpOptions);
    }


    getAverageRatingForSalon(salonID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<any>(`${this.api_url}/avgForSalon/${salonID}`, httpOptions);
    }


    addRatingToDatabase(rating: Rating) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.post<Rating>(`${this.api_url}`, rating, httpOptions);
    }

    getAllRatingForCustomer(customerID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<Rating[]>(`${this.api_url}/getAllByCustomerId/${customerID}`, httpOptions);
    }

    getAllRatingForSalon(salonID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<Rating[]>(`${this.api_url}/allForSalon/${salonID}`, httpOptions);
    }

}
