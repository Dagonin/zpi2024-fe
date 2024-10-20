import { P } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../../classes/customer/customerDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  api_url = `http://localhost:8080`

  checkForPasswords(password: string, passwordRepeat: string){
    if(password===passwordRepeat){
      return true;
    }else{
      return false;
    }
  }




  register(name: string, password: string,passwordRepeat: string, email: string,surname?: string, phone_number?: string){
    // if(this.checkForPasswords(password,passwordRepeat)){


    const newCustomer: CustomerDTO = {
      customerID: null,
      customerName: 'John',
      customerSurname: 'Doe',
      customerDialNumber: '123456789',
      encryptedCustomerPassword: 'password123',
      customerEmail: 'john.doe@example.com',
      serviceCategoryID: 1
    };

      const httpOptions = 
      {
          headers: new HttpHeaders({'Content-Type':'application/json'}),
      }
    console.log(`${this.api_url}/api/customer/register`)
    return this.http.post<CustomerDTO>(`${this.api_url}/api/customer/register`,newCustomer,httpOptions)

    // }
  }




  
}
