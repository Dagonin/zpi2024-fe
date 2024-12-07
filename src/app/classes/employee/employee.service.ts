import { Injectable } from '@angular/core';
import { Employee } from './employee';  // Adjust the path if necessary
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  employees: Employee[] = [];
  employeesMap: Map<number, Employee> = new Map();

  api_url = `http://localhost:8080/api/crud/employee`

  constructor(private http: HttpClient) { }



  getAllEmployeesByListOfId(employeesIDS: number[]) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Employee[]>(`${this.api_url}/getAllByIds`, employeesIDS, httpOptions);
  }


  getEmployeesMap() {
    return this.employeesMap;
  }

  getAllEmployees() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get<Employee[]>(`${this.api_url}`, httpOptions);
  }

  initializeEmployees(): Observable<Employee[]> {
    return this.getAllEmployees().pipe(
      tap((response: Employee[]) => {
        this.employees = response;
        this.employeesMap.clear();
        response.forEach((employee) => this.employeesMap.set(employee.employeeID, employee));
      }),
      catchError((error) => {
        console.error('Failed to initialize employees:', error);
        return throwError(() => new Error('Could not load employees'));
      })
    );
  }


}
