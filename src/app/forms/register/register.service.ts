import { P } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  checkForPasswords(password: string, passwordRepeat: string){
    if(password===passwordRepeat){
      return true;
    }else{
      return false;
    }
  }


  register(login: string, password: string,passwordRepeat: string, email: string, phone_number?: string){
    // tu komunikacja z baza

    return this.checkForPasswords(password,passwordRepeat);
  }


  
}
