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
import { forkJoin, Subject } from 'rxjs';
import { EmployeePanelVisitDialog } from '../dialogs/employee-panel-visit-dialog/employee-panel-visit-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDTO } from '../classes/customer/customerDTO';
import { SalonService } from '../classes/Salon/salon.service';
import { Salon } from '../classes/Salon/salon';
import { ServiceService } from '../classes/service/service.service';
import { ServiceDTO } from '../classes/service/serviceDTO';

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
    MatButtonModule
  ],
  templateUrl: './employee-panel.component.html',
  styleUrl: './employee-panel.component.css'
})
export class EmployeePanelComponent {

  visits: Visit[] = [];
  customerMap: Map<number, CustomerDTO> = new Map();
  serviceMap: Map<number, ServiceDTO> = new Map();
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
    // Use forkJoin to execute observables in parallel
    forkJoin({
      visits: this.visitService.initializeVisitsByEmployeeID(1),
      salons: this.salonService.initializeSalons(),
      services: this.serviceService.initializeServicesForEmployee(1)
    }).subscribe({
      next: ({ visits, salons, services }) => {
        console.log(visits, services)
        this.serviceMap = this.serviceService.getServiceMap();
        this.handleVisits();
      },
      error: (error) => {
        console.error('Error loading data:', error);
        // Optionally show a user-friendly error message
      },
    });
  }

  private populateServiceMap(services: ServiceDTO[]) {

  }

  private handleVisits(): void {
    const visits = this.visitService.getVisits();
    this.customerMap = this.visitService.getCustomerMap();
    this.groupedVisits = this.visitService.groupVisitsByDate(visits);

    this.events = visits.map(visit => {
      const startDateTime = new Date(`${visit.visitDate}T${visit.visitStartTime}`);
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours

      const customer = this.customerMap.get(visit.customerID);
      return {
        start: startDateTime,
        end: endDateTime,
        title: visit.visitStartTime,
        draggable: false,
        meta: {
          body: `${customer?.customerName} ${customer?.customerSurname}`,
          customer: customer,
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
      data: startEvent,
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
        this.selectedVisit.color = {
          "primary": "#e3bc08",
          "secondary": "#FDF1BA"
        }
        this.refresh.next();
      }

    }
  }


  validateEventTimesChanged = (
    { event, newStart, newEnd, allDay }: CalendarEventTimesChangedEvent,
    addCssClass = true
  ) => {
    if (event.allDay) {
      return true;
    }


    // don't allow dragging events to the same times as other events
    const overlappingEvent = this.events.find((otherEvent) => {
      let retBool = false;
      if (newEnd && otherEvent.end) {
        retBool = (otherEvent !== event &&
          !otherEvent.allDay &&
          ((otherEvent.start < newStart && newStart < otherEvent.end) ||
            (otherEvent.start < newEnd && newStart < otherEvent.end)))
      }
      if (!this.selectedVisitBool) {
        event.color = {
          "primary": "#e3bc08",
          "secondary": "#FDF1BA"
        }
      }
      return retBool;
    });

    if (overlappingEvent) {

      if (addCssClass) {
        event.color = {
          "primary": "#ad2121",
          "secondary": "#ad2121"
        }
      } else {

        return false;
      }
    } else {
      if (!this.selectedVisitBool) {
        event.color = {
          "primary": "#e3bc08",
          "secondary": "#FDF1BA"
        }
      } else {
        event.color = {
          "primary": "#74337d",
          "secondary": "#74337d"
        }
      }

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



}
