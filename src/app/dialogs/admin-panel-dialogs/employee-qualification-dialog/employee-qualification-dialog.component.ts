import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeQualification } from '../../../classes/employee-qualification/employee-qualification';
import { Employee } from '../../../classes/employee/employee';
import { ServiceCategoryDTO } from '../../../classes/service/service-categoryDTO';
import { EmployeeQualificationService } from '../../../classes/employee-qualification/employe-qualification.service';

@Component({
  selector: 'app-employee-qualification-dialog',
  standalone: true,
  templateUrl: './employee-qualification-dialog.component.html',
  styleUrls: ['./employee-qualification-dialog.component.css'],
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
export class EmployeeQualificationDialogComponent {
  qualificationForm!: FormGroup;
  isEdit: boolean = false;
  employees: Employee[] = []; // Array of employees
  serviceCategories: ServiceCategoryDTO[] = []; // Array of service categories

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeQualificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { qualification: EmployeeQualification, employees: Employee[], categories: ServiceCategoryDTO[] },
    private employeeQualificationService: EmployeeQualificationService
  ) {
    this.employees = data.employees;
    this.serviceCategories = data.categories;
    this.isEdit = !!data.qualification;
    this.initializeForm(data.qualification);
  }

  private initializeForm(qualification: EmployeeQualification) {
    this.qualificationForm = this.fb.group({
      employeeQualificationID: [qualification ? qualification.employeeQualificationID : null],
      employeeID: [qualification ? qualification.employeeID : null, Validators.required],
      serviceCategoryID: [qualification ? qualification.serviceCategoryID : null, Validators.required]
    });
  }

  onSubmit() {
    if (this.qualificationForm.valid) {
      if (!this.isEdit) {
        this.employeeQualificationService.addEmployeeQualification(this.qualificationForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.employeeQualificationService.editEmployeeQualification(this.qualificationForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }
      this.dialogRef.close(this.qualificationForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
