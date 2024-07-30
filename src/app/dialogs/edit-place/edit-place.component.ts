import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Place } from '../../classes/place/place';

@Component({
  selector: 'app-edit-place',
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
  templateUrl: './edit-place.component.html',
  styleUrl: './edit-place.component.css'
})
export class EditPlaceComponent {

  protected editForm = new FormGroup({
    city: new FormControl('',Validators.required),
    zipCode: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data : Place) {} 

  
  ngOnInit(): void {
    this.editForm.controls['city'].setValue(this.data.city);
    this.editForm.controls['zipCode'].setValue(this.data.zipCode);
    this.editForm.controls['street'].setValue(this.data.street);
}

onSubmit(){
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
