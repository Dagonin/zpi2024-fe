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
import { Subject } from 'rxjs';
import { EmployeePanelVisitDialog } from '../dialogs/employee-panel-visit-dialog/employee-panel-visit-dialog';
import { MatDialog } from '@angular/material/dialog';

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
  groupedVisits: { [key: string]: Visit[] } = {};
  events: CalendarEvent[] = [];
  selectedVisit!: CalendarEvent;
  selectedVisitBool: boolean = false;
  selectedVisitOld!: {
    start: Date,
    end: Date | undefined
  };
  viewDate = new Date();

  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    const visits = this.visitService.getVisits();
    this.groupedVisits = this.visitService.groupVisitsByDate(visits);
    console.log(this.groupedVisits)
    visits.forEach(visit => {
      const startDateTime = new Date(`${visit.date}T${visit.startTime}`);
      // TODO zamienić na prawdziwy czas
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000); // +2 godziny
      this.events.push(
        {
          start: startDateTime,
          end: endDateTime,
          title: `${visit.barber.name} ${visit.barber.surname} at ${visit.place.street}, ${visit.place.city}`,
          draggable: false,
          color: {
            "primary": "#e3bc08",
            "secondary": "#FDF1BA"
          },
        }
      )
    })

  }

  refresh = new Subject<void>();


  readonly dialog = inject(MatDialog);

  openDialog(startEvent: any) {
    const dialogRef = this.dialog.open(EmployeePanelVisitDialog, {
      data: startEvent
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log("hahah")
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
