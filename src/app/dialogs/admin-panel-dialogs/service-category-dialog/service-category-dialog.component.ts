import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { ServiceCategoryDTO } from '../../../classes/service/service-categoryDTO';

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
    @Inject(MAT_DIALOG_DATA) public data: { category: ServiceCategoryDTO }
  ) {
    this.isEdit = !!data.category;
    this.initializeForm(data.category);
  }

  private initializeForm(serviceCategory: ServiceCategoryDTO) {
    console.log(this.data)
    this.categoryForm = this.fb.group({
      categoryName: [serviceCategory ? serviceCategory.categoryName : '', Validators.required],
      categoryDescription: [serviceCategory ? serviceCategory.categoryDescription : '', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formData = this.categoryForm.value;
      this.dialogRef.close(formData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
