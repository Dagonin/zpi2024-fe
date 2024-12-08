// salon-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Salon } from '../../../classes/Salon/salon';
import { MatGridListModule } from '@angular/material/grid-list';
import { SalonService } from '../../../classes/Salon/salon.service';

@Component({
  selector: 'app-salon-dialog',
  templateUrl: './salon-dialog.component.html',
  styleUrls: ['./salon-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule
  ],

})
export class SalonDialogComponent {
  salonForm: FormGroup;
  isEdit: boolean = false; // Flag for edit mode

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SalonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { salon: Salon, isEdit: boolean },
    private salonService: SalonService
  ) {
    this.isEdit = data.isEdit; // Set the edit flag

    // Initialize the form with either empty or existing data
    this.salonForm = this.fb.group({
      salonID: [this.isEdit ? this.data.salon.salonID : null],
      salonName: [this.isEdit ? this.data.salon.salonName : '', Validators.required],
      salonDialNumber: [this.isEdit ? this.data.salon.salonDialNumber : '', [Validators.required]],
      salonCity: [this.isEdit ? this.data.salon.salonCity : '', Validators.required],
      salonStreet: [this.isEdit ? this.data.salon.salonStreet : '', Validators.required],
      salonBuildingNumber: [this.isEdit ? this.data.salon.salonBuildingNumber : '', Validators.required],
      salonPostalCode: [this.isEdit ? this.data.salon.salonPostalCode : '', [Validators.required]],
      latitude: [this.isEdit ? this.data.salon.latitude : '', Validators.required],
      longitude: [this.isEdit ? this.data.salon.longitude : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.salonForm.valid) {

      if (!this.isEdit) {
        this.salonService.addSalon(this.salonForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.salonService.editSalon(this.salonForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }


      this.dialogRef.close(this.salonForm.value);
    }
  }
}

