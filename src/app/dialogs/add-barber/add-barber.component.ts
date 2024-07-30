import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PhoneNumberValidator } from '../../validators/phone-number-validator';

@Component({
  selector: 'app-add-barber',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-barber.component.html',
  styleUrl: './add-barber.component.css'
})
export class AddBarberComponent {
  protected addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('',[Validators.required]),
    phone_number: new FormControl('',[Validators.required,PhoneNumberValidator()]),
    wage: new FormControl('',[Validators.required]),
  });

  onSubmit(){
    console.log(this.addForm)
  }

}
