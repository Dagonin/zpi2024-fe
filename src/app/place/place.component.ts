import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { SalonComponentService } from './services/salon-component.service';
import { SalonServiceIds } from './models/salon-service-Ids';
import { MatButton } from '@angular/material/button';
import { Employee } from '../classes/employee/employee';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeSlotsService } from './services/timeslots.service';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { OpeningHours } from './models/opening-hours';
import { Timeslot } from './models/timeslots';
import { format, parse } from 'date-fns';
import { UserEmailDialog } from '../dialogs/user-email-dialog/user-email-dialog';
import { MatDialog } from '@angular/material/dialog';
import { visit } from './models/visit';
import { SalonService } from '../classes/Salon/salon.service';
import { Salon } from '../classes/Salon/salon';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { RatingService } from '../classes/rating/rating.service';
import { ConfirmDialogSerice } from '../dialogs/confirm-dialog/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { MatIconModule } from '@angular/material/icon';

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
    MatRadioModule,
    MatIconModule
  ],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent implements OnInit, OnDestroy {


  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private mapService: MapService,
    public checkboxService: CheckboxService,
    private salonComponentService: SalonComponentService,
    private salonService: SalonService,
    public timeslotsService: TimeSlotsService,
    private ratingService: RatingService,
    private confirmDialogService: ConfirmDialogSerice,
    private authService: AuthService
  ) { }

  selectedServicesChange = false;
  selectedBarberChange = false;

  salon!: Salon;
  flag!: string;
  private sub: any;

  readonly dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  employees: Employee[] = [];
  employee_timeslots!: Timeslot[];

  minDate!: Date;
  maxDate!: Date;


  private _snackBar = inject(MatSnackBar);


  openSnackBar(text: string) {
    this._snackBar.open(text, "", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error_snack']
    });

  }
  // myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // };

  allowedDates!: string[];
  pickedDate!: Date;


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
    this.route.params.pipe(
      switchMap((params) => {
        this.flag = params['flag'];
        return this.salonService.getSalonById(params['salonid']);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response: any) => {
        this.salon = response;
        this.initializeMap();
        this.setDateLimits();
        this.getServices();
        this.getOpeningHours();
        this.clearSelected()
        this.timeslotsService.generateTimeSlots(this.startTime, this.endTime);
      },
      error: (error) => {
        console.error('Error loading salon:', error);
      }
    });
  }

  private initializeMap(): void {
    if (this.salon) {
      this.mapService.initializeMap('mapp', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
      this.centerMap();
      this.mapService.addMarker([this.salon.longitude, this.salon.latitude]);
    }
  }

  private setDateLimits(): void {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);
  }



  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
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
    this.timeslotsService.resetFormGroup();
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
    const services = this.servicesFormGroup.controls.services.value;

    if (services?.length && this.selectedServicesChange) {
      this.employees = [];
      const requestPayload: SalonServiceIds = {
        salonID: this.salon.salonID,
        serviceIds: services,
      };

      this.fetchEmployeesWithRatings(requestPayload);
    }
  }

  private fetchEmployeesWithRatings(payload: SalonServiceIds): void {
    this.salonComponentService.getAllEmployeesThatCanServeService(payload).subscribe({
      next: (employees: any) => {
        console.log(employees);
        this.selectedServicesChange = false;
        this.employees = employees;
        this.addRatingsToEmployees(employees);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private addRatingsToEmployees(employees: any[]): void {
    employees.forEach((employee) => {
      this.ratingService.getAverageRatingForEmployee(employee.employeeID).subscribe({
        next: (rating: any) => {
          console.log(rating)
          employee.rating = rating.averageRating;
        },
        error: (error) => {
          console.error(`Error fetching rating for employee ${employee.employeeID}:`, error);
        },
      });
    });
  }

  getAllAvailabilityDatesForEmployee() {
    if (this.barbersFormGroup.controls.barber.value !== null) {
      console.log(this.employees[this.barbersFormGroup.controls.barber.value].employeeID)
      this.salonComponentService.getAllAvailabilityDatesForEmployee(this.salon.salonID, this.employees[this.barbersFormGroup.controls.barber.value].employeeID ?? 0).subscribe({
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
    this.timeslotsService.getAllOpeningHoursForSalon(this.salon.salonID).subscribe({
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

  makeAppointment() {
    let userId = this.authService.getUserID();
    if (this.flag) {
      userId = parseInt(this.flag);
    }

    let date = this.timeslotsService.timeslotsFormGroup.controls.day.value;
    date?.setHours(1);

    // Get barber ID
    let barber = this.employees[this.barbersFormGroup.controls.barber.value ?? 0].employeeID;

    console.log(barber, date);

    if (date && barber) {
      let newVisit = new visit(
        this.salon.salonID,
        date.toISOString().split('T')[0],
        this.timeslotsService.indexToHour(this.timeslotsService.timeslotsFormGroup.controls.time_slot.value) + ":00",
        'RESERVED',
        barber,
        userId,
        this.checkboxService.getSelectedServicesIds()
      );

      this.confirmDialogService
        .confirm({
          title: 'Potwierdź umówienie wizyty',
          message: `Czy jesteś pewny, że chcesz się umówić na wizytę: ${barber} w dniu ${date.toDateString()}?`,
          confirmText: 'Tak',
          cancelText: 'Nie',
        })
        .subscribe((confirmed) => {
          if (confirmed) {
            this.salonComponentService.makeAppointment(newVisit).subscribe({
              next: (response: any) => {
                console.log('Appointment created successfully:', response);
                window.location.reload();
              },
              error: (error) => {
                console.error('Error creating appointment:', error);
                this.openSnackBar("Coś poszło nie tak, odśwież stronę.")
              },
            });
          } else {
            console.log('Appointment creation aborted.');
          }
        });
    }
  }



  centerMap() {
    this.mapService.zoomOnCoords([this.salon.longitude, this.salon.latitude]);
  }

}
