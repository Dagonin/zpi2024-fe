import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../classes/place/place';
import { PlaceService } from '../classes/place/place.service';
import { CommonModule, formatDate } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceCategoryDTO } from '../classes/service/service-categoryDTO';
import { MatCheckbox } from '@angular/material/checkbox';
import { ServiceService } from '../classes/service/service.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { MapService } from '../map/map.service';
import { CheckboxService } from './services/checkbox.service';
import { EmployeesInSalonService } from './services/employees-in-salon.service';
import { SalonServiceIds } from './models/salon-service-Ids';
import { MatButton } from '@angular/material/button';
import { EmployeeDTO } from '../classes/employee/employeeDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeSlotsService } from './services/timeslots.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { OpeningHours } from './models/opening-hours';
import { Timeslot } from './models/timeslots';
import { format } from 'date-fns';

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
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule
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
    public checkboxService: CheckboxService,
    private employeesInSalonService: EmployeesInSalonService,
    public timeslotsService: TimeSlotsService
  ) { }

  selectedServicesChange = false;
  selectedBarberChange = false;

  place!: Place;
  userid!: string;
  private sub: any;


  employees: EmployeeDTO[] = [];
  employee_timeslots!: Timeslot[];

  minDate!: Date;
  maxDate!: Date;

  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };

  allowedDates!: string[];

  myFilter = (date: Date | null): boolean => {
    if (!date) {
      return false
    };
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    const dateString = adjustedDate.toISOString().split('T')[0];
    return this.allowedDates.includes(dateString);
  };

  serviceCategories !: ServiceCategoryDTO[];

  visitTime!: number;
  visitPrice!: number;


  startTime: [number, number] = [8, 0];
  endTime: [number, number] = [20, 15];
  openingHours!: OpeningHours[];

  hoveredIndex: number | null = null;

  protected servicesFormGroup = new FormGroup({
    services: new FormControl<number[]>([], Validators.required),
  }, { updateOn: 'blur' },)

  protected barbersFormGroup = new FormGroup({
    barber: new FormControl<number | null>(null, [Validators.required, Validators.nullValidator])
  });


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.place = this.placeService.getPlace(params['placeid']);
      this.userid = params['userid'];
    });

    this.mapService.initializeMap('mapp', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    this.centerMap();

    this.clearSelected();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);

    this.getServices();
    this.getOpeningHours();

    this.timeslotsService.generateTimeSlots(this.startTime, this.endTime);
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
    this.barbersFormGroup.setValue({ barber: null })
    this.selectedServicesChange = true;
  }

  onBarberChange() {
    this.selectedBarberChange = true;
    console.log("barber changed")
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
    console.log(this.selectedBarberChange);
    if (this.barbersFormGroup.controls.barber.value !== null) {
      if (this.selectedBarberChange) {
        this.timeslotsService.resetFormGroup()
        this.timeslotsService.resetTimeSlots()
        this.selectedBarberChange = false;
        this.timeslotsService.getAllTimeslotsForAnEmployee(this.employees[this.barbersFormGroup.controls.barber.value].employeeID).subscribe({
          next: (response: any) => {
            console.log(response)
            this.employee_timeslots = response;
          },
          error: (error) => {
            console.error(error)
          }
        })
      }
    }
  }


  onMouseEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }


  selectTimeSlots(index: number) {
    this.timeslotsService.selectTimeSlots(index, this.visitTime);
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

  enableTimeSlots() {
    let dayValue = this.timeslotsService.timeslotsFormGroup.controls.day.value;
    if (dayValue) {
      let date = dayValue;
      let weekday = date?.getDay()
      let openingHours = this.openingHours[weekday - 1]
      this.timeslotsService.resetTimeSlots();
      this.timeslotsService.enableTimeslotsInRange(openingHours.openingHour, openingHours.closingHour)
      this.employee_timeslots.forEach(ts => {
        if (format(new Date(ts.timeSlotDate), 'dd MM yyyy') == format(date, 'dd MM yyyy')) {
          this.timeslotsService.disableTimeSlotStr(ts.timeSlotTime);
        }
      })
    }
  }


  getAllEmployeesThatCanServeService() {
    if (this.servicesFormGroup.controls.services.value?.length && this.selectedServicesChange) {
      this.employees = [];
      //                               tu zamienic 1 na salonID           XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      const obj: SalonServiceIds = {
        salonID: 1,
        serviceIds: this.servicesFormGroup.controls.services.value
      }
      this.employeesInSalonService.getAllEmployeesThatCanServeService(obj).subscribe({
        next: (response: any) => {
          console.log(response);
          this.selectedServicesChange = false;
          this.employees = response;
        },
        error: (error) => {
          console.error(error)
        }
      });
    }
  }
  getAllAvailabilityDatesForEmployee() {
    if (this.barbersFormGroup.controls.barber.value !== null) {
      console.log(this.employees[this.barbersFormGroup.controls.barber.value].employeeID)
      //                               tu zamienic 1 na salonID               XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      this.employeesInSalonService.getAllAvailabilityDatesForEmployee('1', this.employees[this.barbersFormGroup.controls.barber.value].employeeID ?? 0).subscribe({
        next: (response: any) => {
          console.log(response);
          this.allowedDates = response;
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  getOpeningHours() {
    this.timeslotsService.getAllOpeningHoursForSalon(this.place.id).subscribe({
      next: (response: any) => {
        this.openingHours = response;
        console.log(this.openingHours)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  stepperChange(event: any) {
    if (event.selectedIndex > event.previouslySelectedIndex)
      switch (event.selectedIndex) {
        case 1: {
          this.getAllEmployeesThatCanServeService();
          break;
        }
        case 2: {
          this.generateTimeSlots();
          this.getAllAvailabilityDatesForEmployee();
          break;
        }
      }
  }


  centerMap() {
    this.mapService.zoomOnCoords(this.place.coords);
  }

}
