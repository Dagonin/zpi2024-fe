import { Component, inject, OnInit } from '@angular/core';
import { VisitService } from '../classes/visit/visit.service';
import { Visit } from '../classes/visit/visit';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RatingDialogComponent } from '../dialogs/rating-dialog/rating-dialog.component';
import { Employee } from '../classes/employee/employee';
import { ServiceService } from '../classes/service/service.service';
import { HistoryDetailsDialog } from '../dialogs/history-details-dialog/history-details-dialog';
import { SalonService } from '../classes/Salon/salon.service';
import { forkJoin, switchMap } from 'rxjs';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { Salon } from '../classes/Salon/salon';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {


  readonly dialog = inject(MatDialog);

  visits: Visit[] = [];
  visitMap: Map<number, Visit> = new Map();
  serviceMap: Map<number, ServiceDTO> = new Map();
  employeeMap: Map<number, Employee> = new Map();
  salonMap: Map<number, Salon> = new Map();
  visitServiceMap: Map<number, number[]> = new Map();

  openRatingDialog() {
    this.dialog.open(RatingDialogComponent);
  }

  openDetailsDialog(employeeID: number, visitID: number, salonID: number) {
    const dialogRef = this.dialog.open(HistoryDetailsDialog, {
      data: {
        employee: this.employeeMap.get(employeeID),
        visit: this.visitMap.get(visitID),
        salon: this.salonMap.get(salonID)
      },
      height: '400px',
      width: '600px',
    });
  }
  constructor(public visitService: VisitService, private serviceService: ServiceService, private salonService: SalonService) { }


  ngOnInit(): void {
    // TODO: Replace hardcoded customer ID with dynamic value if necessary.

    forkJoin({
      visits: this.visitService.initializeVisitsByCustomerID(1),
      salons: this.salonService.initializeSalons(),
      services: this.serviceService.initializeServicesForCustomer(1),
    })
      .pipe(
        switchMap(({ visits, salons, services }) => {
          this.serviceMap = this.serviceService.getServiceMap();
          this.salonMap = this.salonService.getSalonMap();
          this.visits = this.visitService.getVisits();
          this.employeeMap = this.visitService.getEmployeeMap();
          this.visitMap.clear();
          this.visits.forEach((visit) => {
            this.visitMap.set(visit.visitID, visit);
          });
          this.visitServiceMap = this.serviceService.createVisitServiceMap(services);

          const distinctIds = this.serviceService.getDistinctIDs(services);
          return this.serviceService.initializeServicesByListOfIds(distinctIds);
        })
      )
      .subscribe({
        next: (allServices) => {

          this.serviceMap = this.serviceService.getServiceMap();
          console.log(this.serviceMap, this.visitServiceMap);
        },
        error: (error) => {
          console.error('Error loading data:', error);
        },
      });
  }


}
