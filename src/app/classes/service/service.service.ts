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
  service_api_url = `http://localhost:8080/api/crud/service`

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

  calculateServicesPrice(services: number[] | undefined) {
    let price = 0;
    if (services) {
      services.forEach(serviceID => {
        price += this.serviceMap.get(serviceID)?.servicePrice ?? 0;
      })
    }

    return price;
  }

  calculateServicesTime(services: number[] | undefined) {
    let time = 0;
    if (services) {
      services.forEach(serviceID => {
        time += (this.serviceMap.get(serviceID)?.serviceSpan ?? 0) * 15;
      })
    }

    return time;
  }

  private mapServices() {
    this.serviceMap.clear();
    this.services.forEach((service) => this.serviceMap.set(service.serviceID, service));
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


  getAllServicesForSalon(salonID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<any>(`${this.appointment_api_url}/forSalon/${salonID}`, httpOptions)
  }

  getAllServicesByListOfIds(servicesIDs: number[]) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.post<ServiceDTO[]>(`${this.service_api_url}/getAllById`, servicesIDs, httpOptions)
  }


  getAllServices() {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<ServiceDTO[]>(`${this.service_api_url}`, httpOptions)
  }





  initializeServices() {
    return this.getAllServices().pipe(
      tap((response: any) => {
        this.services = response;
        this.mapServices();
      }),
      catchError((error) => {
        console.error('Failed to initialize services:', error);
        return throwError(() => new Error('Could not load services'));
      })
    );
  }




  initializeServicesByListOfIds(servicesIDs: number[]) {
    return this.getAllServicesByListOfIds(servicesIDs).pipe(
      tap((response: any) => {
        this.services = response;
        this.mapServices();
      }),
      catchError((error) => {
        console.error('Failed to initialize salons:', error);
        return throwError(() => new Error('Could not load salons'));
      })
    );
  }



  initializeServicesForEmployee(employeeID: number) {
    return this.getAllServicesForEmployee(employeeID).pipe(
      tap((response: any) => {
        this.services = response;
        // this.mapServices();
      }),
      catchError((error) => {
        console.error('Failed to initialize services:', error);
        return throwError(() => new Error('Could not load services'));
      })
    );
  }

  initializeServicesForCustomer(customerID: number) {
    return this.getAllServicesForCustomer(customerID).pipe(
      tap((response: any) => {
        this.services = response;
        // this.mapServices();
      }),
      catchError((error) => {
        console.error('Failed to initialize services:', error);
        return throwError(() => new Error('Could not load services'));
      })
    );
  }

  initializeServicesForSalon(salonID: number) {
    return this.getAllServicesForCustomer(salonID).pipe(
      tap((response: any) => {
        this.services = response;
        // this.mapServices();
      }),
      catchError((error) => {
        console.error('Failed to initialize services:', error);
        return throwError(() => new Error('Could not load services'));
      })
    );
  }






  getDistinctIDs(services: { serviceInVisitId: number; serviceID: number, visitID: number }[]): number[] {
    const serviceIDs = new Set<number>();

    for (const service of services) {
      serviceIDs.add(service.serviceID);
    }

    return Array.from(serviceIDs);

  }

  createVisitServiceMap(data: { serviceInVisitId: number; serviceID: number, visitID: number }[]) {
    const visitServiceMap = new Map<number, number[]>();

    data.forEach(item => {
      const { visitID, serviceID } = item;
      if (!visitServiceMap.has(visitID)) {
        visitServiceMap.set(visitID, []);
      }
      visitServiceMap.get(visitID)!.push(serviceID);
    });

    return visitServiceMap;
  }


  addService(newService: ServiceDTO) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<boolean>(`${this.service_api_url}`, newService, httpOptions);
  }
  editService(newService: ServiceDTO) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<boolean>(`${this.service_api_url}`, newService, httpOptions);
  }

  deleteService(serviceID: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<boolean>(`${this.service_api_url}/${serviceID}`, httpOptions);
  }




}

