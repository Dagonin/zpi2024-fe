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

  api_url = `http://localhost:8080/api/auth`

  checkForPasswords(password: string, passwordRepeat: string){
    if(password===passwordRepeat){
      return true;
    }else{
      return false;
    }
  }




  register(name: string, password: string, email: string, phone_number: string,surname?: string){
    // if(this.checkForPasswords(password,passwordRepeat)){
    if(!surname){
      surname = ""
    }

    

    const newCustomer: CustomerDTO = {
      customerID: 0, 
      customerName: name,
      customerSurname: surname,
      customerDialNumber: phone_number,
      encryptedCustomerPassword: password,
      customerEmail: email,
      serviceCategoryID: 1
    };
    console.log(newCustomer)
      const httpOptions = 
      {
          headers: new HttpHeaders({'Content-Type':'application/json'}),
          
      }
    console.log(`${this.api_url}/customer/register`)
    return this.http.post<string>(`${this.api_url}/customer/register`,newCustomer,httpOptions)

    // }
  }




  
}
