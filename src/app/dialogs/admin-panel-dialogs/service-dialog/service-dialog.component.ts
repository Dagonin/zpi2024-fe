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
import { ServiceService } from '../../../classes/service/service.service';
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
    @Inject(MAT_DIALOG_DATA) public data: { service: ServiceDTO, categories: ServiceCategoryDTO[] },
    private serviceService: ServiceService
  ) {
    this.categories = data.categories;
    this.isEdit = !!data.service;
    this.initializeForm(data.service);
  }

  private initializeForm(service: ServiceDTO) {
    this.serviceForm = this.fb.group({
      serviceID: [service ? this.data.service.serviceID : null],
      serviceName: [service ? service.serviceName : '', Validators.required],
      serviceSpan: [service ? service.serviceSpan : null, [Validators.required, Validators.min(1)]],
      servicePrice: [service ? service.servicePrice : null, [Validators.required, Validators.min(1)]],
      serviceDescription: [service ? service.serviceDescription : '', Validators.required],
      serviceCategoryID: [service ? service.serviceCategoryID : null, Validators.required],
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      if (!this.isEdit) {
        this.serviceService.addService(this.serviceForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.serviceService.editService(this.serviceForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }


      this.dialogRef.close(this.serviceForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
