import { Injectable } from '@angular/core';
import { ServiceDTO } from './serviceDTO';  // Adjust the import path based on your file structure
import { StringMappingType } from 'typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }


  api_url = `http://localhost:8080/api/crud/appointment-making`
  appointment_api_url = `http://localhost:8080/api/crud/service-visit`

  services: ServiceDTO[] = [];
  serviceMap: Map<number, ServiceDTO> = new Map();



  getServices() {
    return this.services;
  }


  getService(id: number) {
    return this.serviceMap.get(id);
  }

  getServiceMap() {
    return this.serviceMap;
  }

  getServicesFromSalon(salonID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<string>(`${this.api_url}/services-and-categories/${salonID}`, httpOptions)
  }

  getAllServicesForCustomer(customerID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<ServiceDTO[]>(`${this.appointment_api_url}/forCustomer/${customerID}`, httpOptions)
  }

  getAllServicesForEmployee(employeeID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<ServiceDTO[]>(`${this.appointment_api_url}/forEmployee/${employeeID}`, httpOptions)
  }

  initializeServicesForEmployee(employeeID: number) {
    return this.getAllServicesForEmployee(employeeID).pipe(
      tap((response: ServiceDTO[]) => {
        this.services = response;
        this.serviceMap.clear();
        response.forEach((service) => this.serviceMap.set(service.serviceID, service));
      }),
      catchError((error) => {
        console.error('Failed to initialize salons:', error);
        return throwError(() => new Error('Could not load salons'));
      })
    );
  }

  initializeServicesForCustomer(customerID: number) {
    return this.getAllServicesForCustomer(customerID).pipe(
      tap((response: ServiceDTO[]) => {
        this.services = response;
        this.serviceMap.clear();
        response.forEach((service) => this.serviceMap.set(service.serviceID, service));
      }),
      catchError((error) => {
        console.error('Failed to initialize salons:', error);
        return throwError(() => new Error('Could not load salons'));
      })
    );
  }

}
