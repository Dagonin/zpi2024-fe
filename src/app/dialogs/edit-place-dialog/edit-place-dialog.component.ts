import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Salon } from '../../classes/Salon/salon';

@Component({
  selector: 'app-edit-place-dialog',
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
  templateUrl: './edit-place-dialog.component.html',
  styleUrl: './edit-place-dialog.component.css'
})
export class EditPlaceDialogComponent {

  protected editForm = new FormGroup({
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Salon) { }


  ngOnInit(): void {
    this.editForm.controls['city'].setValue(this.data.salonCity);
    this.editForm.controls['zipCode'].setValue(this.data.salonPostalCode);
    this.editForm.controls['street'].setValue(this.data.salonStreet);
  }

  onSubmit() {
    console.log("test")
    console.log(this.editForm);
  }

}


// id: string;
// city: string;
// zipCode: string;
// street: string;
// coords: [number, number];
// checked: boolean;
// barbers: Barber[];
