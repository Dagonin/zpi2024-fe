import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AssignmentToSalon } from '../../../classes/assignment-to-salon/assigment-to-salon';
import { Employee } from '../../../classes/employee/employee';
import { Salon } from '../../../classes/Salon/salon';
import { AssignmentToSalonService } from '../../../classes/assignment-to-salon/assignment-to-salon.service';

@Component({
  selector: 'app-assignment-dialog',
  templateUrl: './assignment-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule
  ],
  styleUrls: ['./assignment-dialog.component.css']
})
export class AssignmentDialogComponent {
  assignmentForm!: FormGroup;
  isEdit: boolean = false;
  salons: Salon[] = []; // Array of salons
  employees: Employee[] = []; // Array of employees

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { assignment: AssignmentToSalon, salons: Salon[], employees: Employee[] },
    private assignmentService: AssignmentToSalonService
  ) {
    this.salons = data.salons;
    this.employees = data.employees;
    this.isEdit = !!data.assignment;
    this.initializeForm(data.assignment);
  }

  private initializeForm(assignment: AssignmentToSalon) {
    console.log(this.data)
    this.assignmentForm = this.fb.group({
      assigmentID: [assignment ? assignment.assigmentID : null],
      salonID: [assignment ? assignment.salonID : null, Validators.required],
      employeeID: [assignment ? assignment.employeeID : null, Validators.required],
      assigmentDate: [assignment ? assignment.assigmentDate : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.assignmentForm.valid) {
      if (!this.isEdit) {
        this.assignmentService.addAssignmentToSalon(this.assignmentForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.assignmentService.editAssignmentToSalon(this.assignmentForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }

      this.dialogRef.close(this.assignmentForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
