import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../classes/place/place';
import { PlaceService } from '../classes/place/place.service';
import L from 'leaflet';
import { BarberService } from '../classes/barber/barber.service';
import { Barber } from '../classes/barber/barber';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceCategoryDTO } from '../classes/service/service_categoryDTO';
import { MatCheckbox } from '@angular/material/checkbox';
import { ServiceService } from '../classes/service/service.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { MapService } from '../map/map.service';
import { CheckboxService } from './services/checkbox.service';
import { EmployeesInSalonService } from './services/employees_in_salon.service';
import { SalonServiceIds } from './models/salon_service_Ids';
import { MatButton } from '@angular/material/button';
import { EmployeeDTO } from '../classes/employee/employeeDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-place',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),

  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckbox,
    MatAccordion,
    MatExpansionModule,
    MatButton,
    MatProgressSpinnerModule
  ],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent implements OnInit, OnDestroy {


  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private serviceService: ServiceService,
    private mapService: MapService,
    private checkboxService: CheckboxService,
    private employeesInSalonService: EmployeesInSalonService
  ) { }


  place!: Place;
  private sub: any;


  employees: EmployeeDTO[] = [];

  minDate!: Date;
  maxDate!: Date;

  serviceCategories !: ServiceCategoryDTO[];

  visitTime!: number;
  visitPrice!: number;


  startTime: [number, number] = [8, 0]
  endTime: [number, number] = [20, 15]

  //          hour    minute  is_disabled is_checked
  timeSlots: [number, number, boolean, boolean][] = [];

  hoveredIndex: number | null = null;

  protected servicesFormGroup = new FormGroup({
    services: new FormControl<number[]>([], Validators.required),
  }, { updateOn: 'blur' },)

  protected secondFormGroup = new FormGroup({
    time_slot: new FormControl(-1, [Validators.required, Validators.min(0)]),
    day: new FormControl('', Validators.required)
  }, { updateOn: 'blur' },)


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.place = this.placeService.getPlace(params['placeid']);
    });
    this.mapService.initializeMap('mapp', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    this.centerMap();

    this.clearSelected();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);

    this.getServices()
  }

  ngAfterViewInit() {
    this.mapService.addMarker(this.place.coords);
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.mapService.removeMap();
  }


  onCheckboxChange(service: ServiceDTO, event: any): void {
    const added = this.checkboxService.onCheckboxChange(service, event.checked);
    if (!added) {
      event.source.checked = false;
      alert('You can only select up to 3 services.');
    }
    const { totalPrice, totalTime } = this.checkboxService.calculateServices();
    this.visitPrice = totalPrice;
    this.visitTime = totalTime;
    this.servicesFormGroup.controls.services.setValue(this.checkboxService.getSelectedServicesIds());
  }

  clearSelected(): void {
    this.checkboxService.clearSelected();
    const { totalPrice, totalTime } = this.checkboxService.calculateServices();
    this.visitPrice = totalPrice;
    this.visitTime = totalTime;
  }

  isSelected(service: ServiceDTO): boolean {
    return this.checkboxService.isSelected(service);
  }

  isMaxSelected(): boolean {
    return this.checkboxService.isMaxSelected();
  }


  generateTimeSlots() {
    let newTime = this.startTime;
    while (this.isTupleSmaller(newTime, this.endTime)) {
      this.timeSlots.push([newTime[0], newTime[1], false, false]);
      newTime[1] = (newTime[1] + 15) % 60;
      if (newTime[1] == 0) {
        newTime[0] += 1;
      }
    }

    this.disableTimeSlot(4);
    this.disableTimeSlot(7);
    this.disableTimeSlot(12);
    this.disableTimeSlot(33);
    this.disableTimeSlot(17);
    this.disableTimeSlot(1);
  }

  disableTimeSlot(index: number) {
    this.timeSlots[index][2] = true;
  }

  isTupleSmaller(a: [number, number], b: [number, number]): boolean {
    if (a[0] < b[0]) {
      return true;
    } else if (a[0] >= b[0]) {
      return false;
    } else {
      return a[1] <= b[1];
    }
  }

  onMouseEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }

  selectTimeSlots(index: number) {
    if (!this.checkIfDisabled(index) && this.secondFormGroup.controls.day.value) {
      this.timeSlots.forEach(x => {
        x[3] = false;
      })

      for (let i = 0; i < this.visitTime; i++) {
        this.timeSlots[index + i][3] = true;
      }

      this.secondFormGroup.controls.time_slot.setValue(index);
    }
  }

  checkIfDisabled(index: number): boolean {
    let flag = false;
    for (let i = 0; i < this.visitTime; i++) {
      if (this.timeSlots[index + i][2] == true) {
        flag = true;
        return flag;
      }
    }
    return flag;
  }


  getServices() {
    this.serviceService.getServicesFromSalon(1).subscribe({
      next: (response: any) => {
        console.log(response.listOfCategories);
        this.serviceCategories = response.listOfCategories
      },
      error: (error) => {
        console.error(error)
      }
    });
  }

  getAllEmployeesThatCanServeService() {
    if (this.servicesFormGroup.controls.services.value?.length) {
      this.employees = [];
      const obj: SalonServiceIds = {
        salonID: 1,
        serviceIds: this.servicesFormGroup.controls.services.value
      }
      console.log(obj)
      this.employeesInSalonService.getAllEmployeesThatCanServeService(obj).subscribe({
        next: (response: any) => {
          console.log(response);
          this.employees = response;
        },
        error: (error) => {
          console.error(error)
        }
      });
    }
  }

  stepperChange(event: any) {
    if (event.selectedIndex > event.previouslySelectedIndex)
      switch (event.selectedIndex) {
        case 1: {
          this.getAllEmployeesThatCanServeService();
          break;
        }
        case 2: {
          this.generateTimeSlots()
          break;
        }
      }
  }


  centerMap() {
    this.mapService.zoomOnCoords(this.place.coords);
  }

}
