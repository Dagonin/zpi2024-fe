import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Barber } from '../../classes/barber/barber';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PhoneNumberValidator } from '../../validators/phone-number-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-barber-dialog',
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
  templateUrl: './edit-barber-dialog.component.html',
  styleUrl: './edit-barber-dialog.component.css'
})
export class EditBarberDialogComponent implements OnInit {
  
  protected editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('',[Validators.required]),
    phone_number: new FormControl('',[Validators.required,PhoneNumberValidator()]),
    wage: new FormControl('',[Validators.required]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data : Barber) {} 

  ngOnInit(): void {
      this.editForm.controls['name'].setValue(this.data.name);
      this.editForm.controls['surname'].setValue(this.data.surname);
      this.editForm.controls['phone_number'].setValue(this.data.phone_number as any);
      this.editForm.controls['wage'].setValue(this.data.wage as any);
  }

  onSubmit(){
    console.log("test")
    console.log(this.editForm);
  }

}
