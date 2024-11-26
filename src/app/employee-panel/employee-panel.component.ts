import { Component, importProvidersFrom, inject } from '@angular/core';
import { VisitService } from '../classes/visit/visit.service';
import { Visit } from '../classes/visit/visit';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { bootstrapApplication } from '@angular/platform-browser';
import { isSameDay, startOfDay } from 'date-fns';
import { forkJoin, Subject, switchMap, tap } from 'rxjs';
import { EmployeePanelVisitDialog } from '../dialogs/employee-panel-visit-dialog/employee-panel-visit-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDTO } from '../classes/customer/customerDTO';
import { SalonService } from '../classes/Salon/salon.service';
import { Salon } from '../classes/Salon/salon';
import { ServiceService } from '../classes/service/service.service';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { SalonComponentService } from '../place/services/salon-component.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-employee-panel',
  standalone: true,
  providers: [

  ],
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatListModule,
    CalendarModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.css'
})
export class EmployeePanelComponent {

  visits: Visit[] = [];
  customerMap: Map<number, CustomerDTO> = new Map();
  serviceMap: Map<number, ServiceDTO> = new Map();
  visitServiceMap: Map<number, number[]> = new Map();
  groupedVisits: { [key: string]: Visit[] } = {};
  events: CalendarEvent[] = [];
  selectedVisit!: CalendarEvent;
  selectedVisitBool: boolean = false;
  selectedVisitOld!: {
    start: Date,
    end: Date | undefined
  };
  viewDate = new Date();

  constructor(private visitService: VisitService, public salonService: SalonService, private serviceService: ServiceService) { }

  ngOnInit(): void {
    forkJoin({
      // TODO id
      visits: this.visitService.initializeVisitsByEmployeeID(1),
      salons: this.salonService.initializeSalons(),
      services: this.serviceService.initializeServicesForEmployee(1),
    })
      .pipe(
        tap(({ services }) => {
          console.log(services)
          const distinctIds = this.serviceService.getDistinctIDs(services);
          this.visitServiceMap = this.serviceService.createVisitServiceMap(services);
        }),
        switchMap(({ services }) => {
          const distinctIds = this.serviceService.getDistinctIDs(services);
          return this.serviceService.initializeServicesByListOfIds(distinctIds);
        })
      )
      .subscribe({
        next: (response) => {
          this.serviceMap = this.serviceService.getServiceMap();
          this.handleVisits();
        },
        error: (error) => {
          console.error('Error loading data:', error);
          // Optionally show a user-friendly error message
        },
      });
  }



  private handleVisits(): void {
    const visits = this.visitService.getVisits();
    this.customerMap = this.visitService.getCustomerMap();
    this.groupedVisits = this.visitService.groupVisitsByDate(visits);

    this.events = visits.map(visit => {
      const visitLen = this.calculateVisitLen(visit.visitID) * 1000 * 60 * 15

      const startDateTime = new Date(`${visit.visitDate}T${visit.visitStartTime}`);
      const endDateTime = new Date(startDateTime.getTime() + visitLen); // Add 2 hours
      const customer = this.customerMap.get(visit.customerID);
      return {
        start: startDateTime,
        end: endDateTime,
        title: `${visit.visitStartTime}  ${customer?.customerName} ${customer?.customerSurname}`,
        draggable: false,
        meta: {
          body: `${customer?.customerName} ${customer?.customerSurname}`,
          customer: customer,
          salon: this.salonService.getSalon(visit.salonID),
          services: this.getServicesForVisit(visit.visitID),
        },
        color: {
          primary: '#e3bc08',
          secondary: '#FDF1BA',
        },
      };
    });

    this.refresh.next();
  }



  refresh = new Subject<void>();


  readonly dialog = inject(MatDialog);

  openDialog(startEvent: any) {
    const dialogRef = this.dialog.open(EmployeePanelVisitDialog, {
      data: startEvent
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.resetDrag()
        this.selectedVisitBool = true;
        this.selectedVisit = startEvent.event;
        this.selectedVisitOld = {
          start: this.selectedVisit.start,
          end: this.selectedVisit.end
        }
        this.selectedVisit.color = {
          "primary": "#74337d",
          "secondary": "#74337d"
        }
        this.selectedVisit.draggable = true;
      }
    });
  }



  resetDrag() {
    if (this.selectedVisitBool) {
      this.selectedVisit.draggable = false;
      this.selectedVisitBool = false;
      if (this.selectedVisitOld) {
        this.selectedVisit.start = this.selectedVisitOld.start;
        this.selectedVisit.end = this.selectedVisitOld.end;
        this.selectedVisit.title = `${this.selectedVisitOld.start.toLocaleTimeString('en-US', { hour12: false })}  ${this.selectedVisit.meta.customer.customerName} ${this.selectedVisit.meta.customer.customerSurname}`
        this.selectedVisit.color = {
          "primary": "#e3bc08",
          "secondary": "#FDF1BA"
        }
        this.refresh.next();
      }

    }
  }


  getServicesForVisit(visitID: number) {
    const servicesIDs = this.visitServiceMap.get(visitID);
    let servicesArr: (ServiceDTO | undefined)[] = [];
    servicesIDs?.forEach(id => {
      servicesArr.push(this.serviceMap.get(id));
    })
    console.log(servicesArr);
    return servicesArr;
  }




  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ): boolean => {
    // Define the boundary time (8:00 PM)
    const boundaryTime = new Date(newStart);
    boundaryTime.setHours(20, 0, 0, 0); // 8:00 PM
    event.title = `${newStart.toLocaleTimeString('en-US', { hour12: false })} ${this.selectedVisit.meta.customer.customerName} ${this.selectedVisit.meta.customer.customerSurname}`
    // Get the current time
    const currentTime = new Date();

    // Block dragging to a time earlier than the current time
    if (newStart < currentTime) {
      console.warn("Cannot drag to a time earlier than the current time.");
      event.color = {
        primary: "#ad2121", // Error color
        secondary: "#FADBD8",
      };
      return false; // Block the event change
    }

    // Block dragging to a time after 8:00 PM
    if (newEnd && newEnd > boundaryTime) {
      console.warn("End time exceeds the allowed limit of 8:00 PM.");
      event.color = {
        primary: "#ad2121", // Error color
        secondary: "#FADBD8",
      };
      return false; // Block the event change
    }

    // Check for overlapping events
    const overlappingEvent = this.events.find((otherEvent) => {
      let retBool = false;
      if (newEnd && otherEvent.end) {
        retBool =
          otherEvent !== event &&
          !otherEvent.allDay &&
          ((otherEvent.start < newStart && newStart < otherEvent.end) ||
            (otherEvent.start < newEnd && newStart < otherEvent.end));
      }
      if (!this.selectedVisitBool) {
        event.color = {
          primary: "#e3bc08",
          secondary: "#FDF1BA",
        };
      }
      return retBool;
    });

    if (overlappingEvent) {
      if (addCssClass) {
        event.color = {
          primary: "#ad2121",
          secondary: "#FADBD8",
        };
      } else {
        return false;
      }
    } else {
      event.color = this.selectedVisitBool
        ? { primary: "#74337d", secondary: "#74337d" }
        : { primary: "#e3bc08", secondary: "#FDF1BA" };
    }

    return true;
  };

  eventTimesChanged(
    eventTimesChangedEvent: CalendarEventTimesChangedEvent
  ): void {
    if (this.validateEventTimesChanged(eventTimesChangedEvent, false)) {
      const { event, newStart, newEnd } = eventTimesChangedEvent;

      event.start = newStart;
      event.end = newEnd;
      this.refresh.next();
    }
  }


  calculateVisitLen(visitID: number) {
    const services = this.getServicesForVisit(visitID);
    let visitLen = 0;

    if (services) {
      services.forEach(service => {
        visitLen += service?.serviceSpan ?? 0
      })
    }
    return visitLen
  }


}
