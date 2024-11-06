import { ServiceDTO } from "./serviceDTO";

export class ServiceCategoryDTO {
    serviceCategoryId: number | null;
    categoryName: string;
    categoryDescription: string;
    listOfServices: ServiceDTO[];
  
    constructor(
      serviceCategoryId: number | null,
      categoryName: string,
      categoryDescription: string,
      listOfServices: ServiceDTO[]
    ) {
      this.serviceCategoryId = serviceCategoryId;
      this.categoryName = categoryName;
      this.categoryDescription = categoryDescription;
      this.listOfServices = listOfServices
    }
  }
  