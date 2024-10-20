import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


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
    RouterLink,
    MatButtonToggleModule,
    RouterOutlet
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected loginForm = new FormGroup({
    user_type: new FormControl(''),
    login: new FormControl('',[Validators.required, Validators.minLength(5)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  },{updateOn: 'blur'},) 

  
  opened: boolean = false;

  constructor(private formErrorService: FormErrorsService, private authService: AuthService, private router: Router){
  }


  //  Here encrypt password and send credentials to the server
  onSubmit(){
    const vals = this.loginForm.getRawValue();
    if(this.loginForm.valid){


      this.authService.login(vals.login!,vals.password!).subscribe({
        next: (response) => {
          // Navigate to another page on success or show a success message
          console.log('Login successful', response);
        },
        error: (error) => {
          // Handle error, show an error message
          console.error('Login failed', error);
        }
      });
    }
    }
  





  errorMessage(vals: any, name: string){
    return this.formErrorService.errorMessage(vals,name);
  }


}
