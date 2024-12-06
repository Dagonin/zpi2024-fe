import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBar, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';


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
    RouterOutlet,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected loginForm = new FormGroup({
    user_type: new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),

  }, { updateOn: 'change' },)




  opened: boolean = false;


  constructor(private formErrorService: FormErrorsService, private authService: AuthService, private router: Router) {
  }


  onSubmit() {

    const vals = this.loginForm.getRawValue();
    if (this.loginForm.valid) {
      console.log(vals)
      if (vals.user_type == "C") {
        this.authService.login(vals.login!, vals.password!).subscribe({
          next: (response) => {
            console.log('Login successful', response);
          },
          error: (error) => {
            console.log('Login failed', error);
            this.openSnackBar("Taki użytkownik nie istnieje")
          }
        });
      } else if (vals.user_type == "E") {
        this.authService.employeeLogin(vals.login!, vals.password!).subscribe({
          next: (response) => {
            console.log('Login successful', response);
          },
          error: (error) => {
            console.log('Login failed', error);
            this.openSnackBar("Taki użytkownik nie istnieje")
          }
        });
      }

    }
  }

  private _snackBar = inject(MatSnackBar);


  openSnackBar(text: string) {
    this._snackBar.open(text, "", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error_snack']
    });

  }



  errorMessage(vals: any, name: string) {
    return this.formErrorService.errorMessage(vals, name);
  }


}
