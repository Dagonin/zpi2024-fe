import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ServiceCategoryDTO } from '../../../classes/service/service-categoryDTO';
import { ServiceDTO } from '../../../classes/service/serviceDTO';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-service-dialog',
  standalone: true,
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css'],
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
export class ServiceDialogComponent {
  serviceForm!: FormGroup;
  isEdit: boolean = false;
  categories: ServiceCategoryDTO[] = []; // Assuming you have a type for categories

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { service: ServiceDTO, categories: ServiceCategoryDTO[] }
  ) {
    this.categories = data.categories;
    this.isEdit = !!data.service;
    this.initializeForm(data.service);
  }

  private initializeForm(service: ServiceDTO) {
    this.serviceForm = this.fb.group({
      serviceName: [service ? service.serviceName : '', Validators.required],
      serviceSpan: [service ? service.serviceSpan : null, [Validators.required, Validators.min(1)]],
      servicePrice: [service ? service.servicePrice : null, [Validators.required, Validators.min(1)]],
      serviceDescription: [service ? service.serviceDescription : '', Validators.required],
      serviceCategoryID: [service ? service.serviceCategoryID : null, Validators.required],
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      const formData = this.serviceForm.value;
      this.dialogRef.close(formData); // Close dialog and pass the form data
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close dialog without saving
  }
}
