import { Injectable } from '@angular/core';
import { Employee } from './employee';  // Adjust the path if necessary
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  // employees: Employee[] = [];

  api_url = `http://localhost:8080/api/crud/employee`

  constructor(private http: HttpClient) { }



  getAllEmployeesByListOfId(employeesIDS: number[]) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Employee[]>(`${this.api_url}/getAllByIds`, employeesIDS, httpOptions);
  }
}
