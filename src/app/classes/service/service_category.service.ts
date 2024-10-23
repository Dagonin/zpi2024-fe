import { Injectable } from '@angular/core';
import { ServiceCategoryDTO } from './service_categoryDTO';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

  constructor() { }

  getExampleServiceCategories(): ServiceCategoryDTO[] {
    const serviceCategories: ServiceCategoryDTO[] = [
      new ServiceCategoryDTO(1, 'Haircut', 'All types of haircuts for men and women.'),
      new ServiceCategoryDTO(2, 'Hair Coloring', 'Professional hair coloring services.'),
      new ServiceCategoryDTO(3, 'Facial Treatment', 'Relaxing and rejuvenating facial treatments.'),
      new ServiceCategoryDTO(4, 'Manicure & Pedicure', 'Complete hand and foot care services.'),
      new ServiceCategoryDTO(5, 'Massage Therapy', 'Various types of massages for relaxation and pain relief.')
    ];

    return serviceCategories;
  }
}
