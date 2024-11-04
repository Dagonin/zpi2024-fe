import { Injectable } from '@angular/core';
import { ServiceDTO } from '../../classes/service/serviceDTO';

@Injectable({
    providedIn: 'root'
})
export class CheckboxService {
    maxSelection = 3;
    selectedServices: ServiceDTO[] = [];

    onCheckboxChange(service: ServiceDTO, checked: boolean): boolean {
        if (checked) {
            if (this.selectedServices.length < this.maxSelection) {
                this.selectedServices.push(service);
                return true;
            } else {
                return false;
            }
        } else {
            this.selectedServices = this.selectedServices.filter(ser => ser.serviceID !== service.serviceID);
            return true;
        }
    }

    clearSelected(): void {
        this.selectedServices = [];
    }

    isSelected(service: ServiceDTO): boolean {
        return this.selectedServices.includes(service);
    }

    isMaxSelected(): boolean {
        return this.selectedServices.length >= this.maxSelection;
    }

    calculateServices(): { totalPrice: number, totalTime: number } {
        let totalPrice = 0;
        let totalTime = 0;
        this.selectedServices.forEach(service => {
            totalPrice += service.servicePrice;
            totalTime += service.serviceSpan;
        });
        return { totalPrice, totalTime };
    }

    getSelectedServicesIds(): number[] {
        let ids: number[] = [];
        this.selectedServices.forEach(service => {
            ids.push(service.serviceID);
        })
        return ids;
    }

}
