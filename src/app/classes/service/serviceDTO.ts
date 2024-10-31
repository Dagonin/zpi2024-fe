export class ServiceDTO {
    serviceID: number;
    serviceName: string;
    serviceSpan: number;
    servicePrice: number;
    serviceDescription: string;
    serviceCategoryID: number;
  
    constructor(
      serviceID: number,
      serviceName: string,
      serviceSpan: number,
      servicePrice: number,
      serviceDescription: string,
      serviceCategoryID: number
    ) {
      this.serviceID = serviceID;
      this.serviceName = serviceName;
      this.serviceSpan = serviceSpan;
      this.servicePrice = servicePrice;
      this.serviceDescription = serviceDescription;
      this.serviceCategoryID = serviceCategoryID;
    }
  }