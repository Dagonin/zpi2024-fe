import { Injectable } from '@angular/core';
import { CustomerDTO } from './customerDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customers: CustomerDTO[] = [];

  api_url = `http://localhost:8080/api/crud/customer`

  constructor(private http: HttpClient) { }



  getAllCustomersByListOfId(customersIDS: number[]) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<CustomerDTO[]>(`${this.api_url}/getAllById`, customersIDS, httpOptions);
  }
}
