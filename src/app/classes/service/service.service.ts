import { Injectable } from '@angular/core';
import { ServiceDTO } from './serviceDTO';  // Adjust the import path based on your file structure
import { StringMappingType } from 'typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  api_url = `http://localhost:8080/api/crud/appointment-making`

  getServicesFromSalon(salonID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<string>(`${this.api_url}/services-and-categories/${salonID}`, httpOptions)
  }


}
