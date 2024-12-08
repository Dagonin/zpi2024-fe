import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../employee/employee";
import { EmployeeQualification } from "./employee-qualification";
import { Observable, tap, catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeQualificationService {

    api_url = `http://localhost:8080/api/crud/employee-qualification`

    employeeQualifications: EmployeeQualification[] = [];
    employeeQualificationsMap: Map<number, EmployeeQualification> = new Map();

    constructor(private http: HttpClient) { }


    getEmployeeQualificationsMap(): Map<number, EmployeeQualification> {
        return this.employeeQualificationsMap;
    }

    getAllEmployeeQualifications() {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<EmployeeQualification[]>(`${this.api_url}`, httpOptions);
    }


    initializeEmployeeQualifications(): Observable<EmployeeQualification[]> {
        return this.getAllEmployeeQualifications().pipe(
            tap((response: EmployeeQualification[]) => {
                this.employeeQualifications = response;
                this.employeeQualificationsMap.clear();
                response.forEach((employeeQualification) =>
                    this.employeeQualificationsMap.set(employeeQualification.employeeQualificationID, employeeQualification)
                );
            }),
            catchError((error) => {
                console.error('Failed to initialize employee qualifications:', error);
                return throwError(() => new Error('Could not load employee qualifications'));
            })
        );
    }

    addEmployeeQualification(newEmployeeQualification: EmployeeQualification) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.post<boolean>(`${this.api_url}`, newEmployeeQualification, httpOptions);
    }
    editEmployeeQualification(newEmployeeQualification: EmployeeQualification) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.put<boolean>(`${this.api_url}`, newEmployeeQualification, httpOptions);
    }

    deleteEmployeeQualification(employeeQualificationID: number) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.delete<boolean>(`${this.api_url}/${employeeQualificationID}`, httpOptions);
    }



}
