import { Component, importProvidersFrom } from '@angular/core';
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

  viewDate = new Date();

  constructor(private visitService: VisitService) { }

  ngOnInit(): void {
    const visits = this.visitService.getVisits();
    this.groupedVisits = this.visitService.groupVisitsByDate(visits);
    console.log(this.groupedVisits)
  }


}
