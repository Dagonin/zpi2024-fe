import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    RouterLink,
    MatButtonToggleModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  protected change_passwordForm = new FormGroup({
    old_password: new FormControl('', [Validators.required]),
    old_password_repeat: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required])
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
