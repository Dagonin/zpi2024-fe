import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SalonServiceIds } from "../models/salon-service-Ids";
import { visit } from "../models/visit";

@Injectable({
    providedIn: 'root'
})
export class SalonComponentService {
    constructor(private http: HttpClient) { }

    api_url = `http://localhost:8080/api/crud/appointment-making`

    getAllEmployeesThatCanServeService(SalonServiceIds: SalonServiceIds) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        return this.http.post<string>(`${this.api_url}/employees`, SalonServiceIds, httpOptions)
    }


    getAllAvailabilityDatesForEmployee(salonID: number, employeeID: number) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        return this.http.get<string>(`${this.api_url}/availability-dates/${salonID}/${employeeID}`, httpOptions)
    }

    makeAppointment(visit: visit) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        console.log(visit)
        return this.http.post<string>(`${this.api_url}/save-visit`, visit, httpOptions)
    }

}