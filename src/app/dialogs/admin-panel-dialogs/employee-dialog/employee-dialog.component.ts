// employee-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Employee } from '../../../classes/employee/employee';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { EmployeeService } from '../../../classes/employee/employee.service';


@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatGridListModule
  ],
  providers: [
    provideNativeDateAdapter(),

  ],
})
export class EmployeeDialogComponent {
  employeeForm: FormGroup;
  isEdit: boolean = false; // Flag for edit mode

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee, isEdit: boolean },
    private employeeService: EmployeeService
  ) {
    this.isEdit = data.isEdit; // Set the edit flag

    // Initialize the form with either empty or existing data
    this.employeeForm = this.fb.group({
      employeeID: [this.isEdit ? this.data.employee.employeeID : null],
      employeeName: [this.isEdit ? this.data.employee.employeeName : '', Validators.required],
      employeeSurname: [this.isEdit ? this.data.employee.employeeSurname : '', Validators.required],
      employeeDialNumber: [this.isEdit ? this.data.employee.employeeDialNumber : '', [Validators.required]],
      encryptedEmployeePassword: ['', Validators.required],
      employeeEmail: [this.isEdit ? this.data.employee.employeeEmail : '', [Validators.required, Validators.email]],
      employeeBirthdayDate: [this.isEdit ? this.data.employee.employeeBirthdayDate : '', Validators.required],
      employeeEmploymentDate: [this.isEdit ? this.data.employee.employeeEmploymentDate : '', Validators.required],
      employeeMonthlyPay: [this.isEdit ? this.data.employee.employeeMonthlyPay : '', [Validators.required, Validators.min(1)]],
      employeeCity: [this.isEdit ? this.data.employee.employeeCity : '', Validators.required],
      employeeStreet: [this.isEdit ? this.data.employee.employeeStreet : '', Validators.required],
      employeeBuildingNumber: [this.isEdit ? this.data.employee.employeeBuildingNumber : '', Validators.required],
      employeeApartmentNumber: [this.isEdit ? this.data.employee.employeeApartmentNumber : ''],
      employeePostalCode: [this.isEdit ? this.data.employee.employeePostalCode : '', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.getRawValue())

      if (!this.isEdit) {
        this.employeeService.addEmployee(this.employeeForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.employeeService.editEmployee(this.employeeForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }
      this.dialogRef.close(this.employeeForm.value);
    }
  }
}
