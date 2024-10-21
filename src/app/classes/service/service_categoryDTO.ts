export class ServiceCategoryDTO {
    serviceCategoryId: number | null;
    categoryName: string;
    categoryDescription: string;
  
    constructor(
      serviceCategoryId: number | null,
      categoryName: string,
      categoryDescription: string
    ) {
      this.serviceCategoryId = serviceCategoryId;
      this.categoryName = categoryName;
      this.categoryDescription = categoryDescription;
    }
  }
  