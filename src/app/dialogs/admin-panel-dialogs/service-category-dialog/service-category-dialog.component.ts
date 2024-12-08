import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ServiceCategoryDTO } from '../../../classes/service/service-categoryDTO';
import { ServiceCategoryService } from '../../../classes/service/service-category.service';

@Component({
  selector: 'app-service-category-dialog',
  standalone: true,
  templateUrl: './service-category-dialog.component.html',
  styleUrls: ['./service-category-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
  ],
})
export class ServiceCategoryDialogComponent {
  categoryForm!: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ServiceCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: ServiceCategoryDTO },
    private serviceCategoryService: ServiceCategoryService
  ) {
    this.isEdit = !!data.category;
    this.initializeForm(data.category);
  }

  private initializeForm(serviceCategory: ServiceCategoryDTO) {
    console.log(this.data)
    this.categoryForm = this.fb.group({
      serviceCategoryId: [serviceCategory ? serviceCategory.serviceCategoryId : null],
      categoryName: [serviceCategory ? serviceCategory.categoryName : '', Validators.required],
      categoryDescription: [serviceCategory ? serviceCategory.categoryDescription : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {


      if (!this.isEdit) {
        this.serviceCategoryService.addServiceCategory(this.categoryForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      } else {
        this.serviceCategoryService.editServiceCategory(this.categoryForm.getRawValue()).subscribe({
          next(response) {
            console.log(response)
            window.location.reload();
          },
          error(error) {
            console.log(error)
          }
        })
      }

      this.dialogRef.close(this.categoryForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
