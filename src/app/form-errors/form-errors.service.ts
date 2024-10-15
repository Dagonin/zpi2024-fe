import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {

  constructor() { }



  errorMessage(vals: Object, name: string){
    let obj = Object(vals);
    // console.log(obj,vals)
    if(obj['required']){
      return 'To pole jest wymagane';
    }
    if(obj['minlength']){
      console.log(obj)
      return name + ' musi mieć minimum ' + obj['minlength']['requiredLength'] + ' znaków';
    }
    if(obj['email']){
      return "Adres email nie jest poprawnym adresem email";
    }
    if(obj['PhoneNumber']){
      return "To nie jest poprawny numer telefonu"
    }
    if(obj['area']){
      return "To nie jest poprawny numer kierunkowy"
    }

    // console.log(vals)
    return '';
  }

}
