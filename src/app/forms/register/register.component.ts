import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormErrorsService } from '../../form-errors/form-errors.service';
import { RegisterService } from './register.service';
import { PhoneNumberValidator } from '../../validators/phone-number-validator';
import { RouterLink } from '@angular/router';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Observable } from 'rxjs';
import { CustomerDTO } from '../../classes/customer/customerDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { control } from 'leaflet';



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
    FormsModule,
    AsyncPipe,
    JsonPipe,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {


  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
    surname: new FormControl('', [Validators.minLength(1), Validators.maxLength(50), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_number: new FormControl('', [Validators.required, PhoneNumberValidator(), Validators.minLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(8)]),
    area: new FormControl('', [Validators.maxLength(3)])
  }, { updateOn: 'change' })

  opened: boolean = false;

  private readonly _focusMonitor = inject(FocusMonitor);
  register_service_answer$!: Observable<CustomerDTO>;

  constructor(
    private registerService: RegisterService,
    private formErrorService: FormErrorsService,
  ) { }

  private _snackBar = inject(MatSnackBar);


  onSubmit() {
    // if (this.registerForm.valid) {
    const vals = this.registerForm.getRawValue();
    // const whole_number = vals.area + vals.phone_number;
    // Make sure passwords match before calling the service
    if (vals.password !== vals.passwordRepeat) {
      console.error('Passwords do not match');
      this.openSnackBar("Hasła nie są identyczne")
      return;
    }

    const whole_number = vals.area ? vals.area + vals.phone_number : "+48 " + vals.phone_number;

    this.registerService.register(
      vals.name!,
      vals.password!,
      vals.email!,
      whole_number,
      vals.surname!
    ).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        window.location.reload();
        // Handle success (e.g., navigate to another page or show a success message)
      },
      error: (error) => {
        if (error.status == 409) {
          this.openSnackBar("Użytkownik z takim mailem/numerem telefonu już istnieje");
        } else {
          this.openSnackBar("Coś poszło nie tak")
        }
      }
    });
    // } else {
    //   console.error('Form is not valid');
    // }
  }

  errorMessage(vals: any, name: string) {
    return this.formErrorService.errorMessage(vals, name);
  }

  maxNumber(len: number) {
    this.registerForm
  }




  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, "", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error_snack']
    });

  }




}
