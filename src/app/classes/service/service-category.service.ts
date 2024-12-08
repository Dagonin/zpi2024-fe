import { Injectable } from '@angular/core';
import { ServiceDTO } from './serviceDTO';  // Adjust the import path based on your file structure
import { StringMappingType } from 'typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { ServiceCategoryDTO } from './service-categoryDTO';

@Injectable({
    providedIn: 'root'
})
export class ServiceCategoryService {

    constructor(private http: HttpClient) { }

    serviceCategories: ServiceCategoryDTO[] = [];
    serviceCategoryMap: Map<number, ServiceCategoryDTO> = new Map();

    api_url = `http://localhost:8080/api/crud/service-category`


    getServiceCategoryMap() {
        return this.serviceCategoryMap;
    }

    private getAllServiceCategories(): Observable<ServiceCategoryDTO[]> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<ServiceCategoryDTO[]>(`${this.api_url}`, httpOptions);
    }

    initializeServiceCategories(): Observable<ServiceCategoryDTO[]> {
        return this.getAllServiceCategories().pipe(
            tap((response: ServiceCategoryDTO[]) => {
                this.serviceCategories = response;
                this.serviceCategoryMap.clear();

                response.forEach((serviceCategory) => {
                    if (serviceCategory.serviceCategoryId !== null) {
                        this.serviceCategoryMap.set(serviceCategory.serviceCategoryId, serviceCategory);
                    }
                });
            }),
            catchError((error) => {
                console.error('Failed to initialize service categories:', error);
                return throwError(() => new Error('Could not load service categories'));
            })
        );
    }


    addServiceCategory(newServiceCategory: ServiceCategoryDTO) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.post<boolean>(`${this.api_url}`, newServiceCategory, httpOptions);
    }
    editServiceCategory(newServiceCategory: ServiceCategoryDTO) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.put<boolean>(`${this.api_url}`, newServiceCategory, httpOptions);
    }

    deleteServiceCategory(serviceCategoryID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.delete<boolean>(`${this.api_url}/${serviceCategoryID}`, httpOptions);
    }


}
