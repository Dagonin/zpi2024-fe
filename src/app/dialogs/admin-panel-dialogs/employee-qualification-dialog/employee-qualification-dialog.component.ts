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
    @Inject(MAT_DIALOG_DATA) public data: { qualification: EmployeeQualification, employees: Employee[], categories: ServiceCategoryDTO[] }
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
      const formData = this.qualificationForm.value;
      this.dialogRef.close(formData); // Close dialog and pass the form data
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
