import { Injectable } from '@angular/core';
import { ServiceDTO } from './serviceDTO';  // Adjust the import path based on your file structure

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  // This method will return 5 example services
  getExampleServices(): ServiceDTO[] {
    const services: ServiceDTO[] = [
      new ServiceDTO(1, 'Web Development', 30, 500.0, 'Complete web development package', 101),
      new ServiceDTO(2, 'Graphic Design', 15, 250.0, 'Designing logos, brochures, and more', 102),
      new ServiceDTO(3, 'SEO Optimization', 10, 150.0, 'Optimize website for better search engine ranking', 103),
      new ServiceDTO(4, 'Content Writing', 7, 100.0, 'Professional content writing for blogs and websites', 104),
      new ServiceDTO(5, 'Digital Marketing', 20, 300.0, 'Comprehensive digital marketing service', 105)
    ];
    
    return services;
  }
}
