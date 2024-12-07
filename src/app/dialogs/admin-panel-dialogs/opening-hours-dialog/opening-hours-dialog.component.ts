import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OpeningHours } from '../../../classes/Salon/opening-hours';
import { Salon } from '../../../classes/Salon/salon';

@Component({
  selector: 'app-opening-hours-dialog',
  templateUrl: './opening-hours-dialog.component.html',
  standalone: true,
  styleUrls: ['./opening-hours-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule
  ],
})
export class OpeningHoursDialogComponent {
  openingHoursForm!: FormGroup;
  isEdit: boolean = false;
  salons: Salon[] = []; // Assuming salons are provided in the data

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OpeningHoursDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { openingHours: OpeningHours, salons: Salon[] }
  ) {
    this.salons = data.salons;
    this.isEdit = !!data.openingHours;
    this.initializeForm(data.openingHours);
  }

  private initializeForm(openingHours: OpeningHours) {
    console.log(this.data)
    this.openingHoursForm = this.fb.group({
      salonID: [openingHours ? openingHours.salonID : null, Validators.required],
      weekday: [openingHours ? openingHours.weekday : '', Validators.required],
      openingHour: [openingHours ? openingHours.openingHour : '', Validators.required],
      closingHour: [openingHours ? openingHours.closingHour : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.openingHoursForm.valid) {
      const formData = this.openingHoursForm.value;
      this.dialogRef.close(formData); // Close dialog and pass the form data
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
