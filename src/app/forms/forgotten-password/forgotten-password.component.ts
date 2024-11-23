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


  constructor(private formErrorService: FormErrorsService, private router: Router) {
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

}
