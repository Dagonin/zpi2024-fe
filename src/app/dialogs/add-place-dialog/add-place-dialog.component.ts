import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-place-dialog',
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
  templateUrl: './add-place-dialog.component.html',
  styleUrl: './add-place-dialog.component.css'
})
export class AddPlaceDialogComponent {

  
  protected addForm = new FormGroup({
    city: new FormControl('',Validators.required),
    zipCode: new FormControl('',Validators.required),
    street: new FormControl('',Validators.required),
  })


  onSubmit(){
    console.log("test")
    console.log(this.addForm);
  }
}
