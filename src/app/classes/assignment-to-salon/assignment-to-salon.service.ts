import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AssignmentToSalon } from './assigment-to-salon';

@Injectable({
    providedIn: 'root',
})
export class AssignmentToSalonService {
    private api_url = 'http://localhost:8080/api/crud/assignment-to-salon'; // Replace with your actual API URL

    assignments: AssignmentToSalon[] = [];
    assignmentsMap: Map<number, AssignmentToSalon[]> = new Map();
    // assignmentsByEmployee: Map<number, AssignmentToSalon[]> = new Map();

    constructor(private http: HttpClient) { }


    getAssignmentsMap() {
        return this.assignmentsMap;
    }

    private getAllAssignments(): Observable<AssignmentToSalon[]> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        };
        return this.http.get<AssignmentToSalon[]>(`${this.api_url}`, httpOptions);
    }

    initializeAssignments(): Observable<AssignmentToSalon[]> {
        return this.getAllAssignments().pipe(
            tap((response: AssignmentToSalon[]) => {
                this.assignments = response;

                this.assignmentsMap.clear();
                // this.assignmentsByEmployee.clear();

                response.forEach((assignment) => {
                    const salonID = assignment.salonID;
                    if (!this.assignmentsMap.has(salonID)) {
                        this.assignmentsMap.set(salonID, []);
                    }
                    this.assignmentsMap.get(salonID)?.push(assignment);

                    // const employeeID = assignment.getEmployeeID();
                    // if (!this.assignmentsByEmployee.has(employeeID)) {
                    //     this.assignmentsByEmployee.set(employeeID, []);
                    // }
                    // this.assignmentsByEmployee.get(employeeID)?.push(assignment);
                });
            }),
            catchError((error) => {
                console.error('Failed to initialize assignments:', error);
                return throwError(() => new Error('Could not load assignments'));
            })
        );
    }
}
