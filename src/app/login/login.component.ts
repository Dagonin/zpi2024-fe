import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormErrorsService } from '../form-errors/form-errors.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected loginForm = new FormGroup({
    login: new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  },{updateOn: 'blur'},) 

  
  opened: boolean = false;

  constructor(private formErrorService: FormErrorsService, private authService: AuthService, private router: Router){
  }


  //  Here encrypt password and send credentials to the server
  onSubmit(){
    if(this.loginForm.valid){
      if(this.authService.login(this.loginForm.value)){
        this.router.navigate([''])
      }
    }
  }





  errorMessage(vals: any, name: string){
    return this.formErrorService.errorMessage(vals,name);
  }


}
