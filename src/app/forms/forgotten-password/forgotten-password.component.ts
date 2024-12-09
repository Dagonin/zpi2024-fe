import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgotten-password',
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
    MatButtonToggleModule],
  templateUrl: './forgotten-password.component.html',
  styleUrl: './forgotten-password.component.css'
})
export class ForgottenPasswordComponent {

  protected forgotten_passwordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  }, { updateOn: 'change' })


  constructor(private formErrorService: FormErrorsService, private router: Router, private http: HttpClient) {
  }


  onSubmit() {
    // if(this.loginForm.valid){
    //   if(this.authService.login(this.loginForm.value)){
    //     this.router.navigate([''])
    //   }
    // }
  }

  errorMessage(vals: any, name: string) {
    return this.formErrorService.errorMessage(vals, name);
  }



  lostPassword() {
    this.sendPasswordLostEmail().subscribe({
      next(value) {
        console.log(value)
      },
      error(err) {
        console.log(err)
      },
    })
  }


  sendPasswordLostEmail() {
    const email = this.forgotten_passwordForm.getRawValue();
    console.log(email)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<boolean>(`http://localhost:8080/api/crud/customer/password-change-request`, email, httpOptions);
  }


}
