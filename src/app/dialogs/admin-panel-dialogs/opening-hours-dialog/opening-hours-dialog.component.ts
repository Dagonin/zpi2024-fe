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
import { SalonService } from '../../../classes/Salon/salon.service';

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
    @Inject(MAT_DIALOG_DATA) public data: { openingHours: OpeningHours, salons: Salon[] },
    private salonService: SalonService
  ) {
    this.salons = data.salons;
    this.isEdit = !!data.openingHours;
    this.initializeForm(data.openingHours);
  }

  private initializeForm(openingHours: OpeningHours) {
    console.log(this.data)
    this.openingHoursForm = this.fb.group({
      openingHoursID: [openingHours ? openingHours.openingHoursID : null],
      salonID: [openingHours ? openingHours.salonID : null, Validators.required],
      weekday: [openingHours ? openingHours.weekday : '', Validators.required],
      openingHour: [openingHours ? openingHours.openingHour : '', Validators.required],
      closingHour: [openingHours ? openingHours.closingHour : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.openingHoursForm.valid) {
      console.log()
      let openingHours: OpeningHours = this.openingHoursForm.getRawValue()
      if (openingHours.closingHour.length != 8) {
        openingHours.closingHour = openingHours.closingHour + ":00";
      }
      if (openingHours.openingHour.length != 8) {
        openingHours.openingHour = openingHours.openingHour + ":00";
      }
      console.log(openingHours)
      if (!this.isEdit) {
        this.salonService.addOpeningHours(openingHours).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.salonService.editOpeningHours(openingHours).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }
      this.dialogRef.close(this.openingHoursForm.value); // Close dialog and pass the form data
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
