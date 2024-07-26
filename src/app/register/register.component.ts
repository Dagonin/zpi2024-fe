import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormErrorsService } from '../form-errors/form-errors.service';
import { RegisterService } from './register.service';
import { PhoneNumberValidator } from '../validators/phone-number-validator';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [    
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    RouterLink,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  protected registerForm = new FormGroup({
    login: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phone_number: new FormControl('',[Validators.required,PhoneNumberValidator()]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    passwordRepeat: new FormControl('',[Validators.required,Validators.minLength(8)])
  },{updateOn: 'blur'})

  opened: boolean = false;

  constructor(
    private registerService: RegisterService,
    private formErrorService : FormErrorsService,  
  ){}


  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm)
      let vals = this.registerForm.getRawValue()
      console.log(this.registerService.register(vals.login!,vals.password!,vals.passwordRepeat!,vals.email!,vals.phone_number!))
    }
  }

  errorMessage(vals: any, name: string){
    return this.formErrorService.errorMessage(vals,name);
  }
  
  maxNumber(len: number){
    this.registerForm
  }

}
