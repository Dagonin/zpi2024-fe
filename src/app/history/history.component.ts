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
import { RatingService } from '../classes/rating/rating.service';
import { Rating } from '../classes/rating/rating';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomerTimeSlotsDialog } from '../dialogs/customer-time-slots-dialog/customer-time-slots-dialog';
import { ConfirmDialogSerice } from '../dialogs/confirm-dialog/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule
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
  ratingMap: Map<number, Rating> = new Map();

  private _snackBar = inject(MatSnackBar);


  openSnackBar(text: string) {
    this._snackBar.open(text, "", {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['error_snack']
    });

  }

  openRatingDialog(employeeID: number, visitID: number, salonID: number) {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: {
        employee: this.employeeMap.get(employeeID),
        visit: this.visitMap.get(visitID),
        salon: this.salonMap.get(salonID),
        rating: this.ratingMap.get(visitID)
      },
      height: '400px',
      width: '600px',
    });
  }

  openDetailsDialog(employeeID: number, visitID: number, salonID: number) {
    const dialogRef = this.dialog.open(HistoryDetailsDialog, {
      data: {
        employee: this.employeeMap.get(employeeID),
        visit: this.visitMap.get(visitID),
        salon: this.salonMap.get(salonID),
      },
      height: '400px',
      width: '600px',
    });
  }

  openRescheduleDialog(visitID: number, rescheduleBool: boolean) {
    const visit = this.visitMap.get(visitID)
    let visitTime = 0;
    const services = this.visitServiceMap.get(visitID)
    services?.forEach(service => {
      visitTime += this.serviceMap.get(service)?.serviceSpan ?? 0;
    })
    // const employee = this.employeeMap.get(visit.employeeID)
    const dialogRef = this.dialog.open(CustomerTimeSlotsDialog, {
      data: {
        visit: visit,
        visitTime: visitTime,
        bool: rescheduleBool,
        services: services
      },
      height: '850px',
      width: '1200px',
    });
  }

  constructor(public visitService: VisitService, private serviceService: ServiceService, private salonService: SalonService, private ratingService: RatingService, private confirmDialogService: ConfirmDialogSerice) { }


  ngOnInit(): void {
    // TODO: Replace hardcoded customer ID with dynamic value if necessary.

    forkJoin({
      visits: this.visitService.initializeVisitsByCustomerID(1),
      salons: this.salonService.initializeSalons(),
      services: this.serviceService.initializeServicesForCustomer(1),
      ratings: this.ratingService.getAllRatingForCustomer(1)
    })
      .pipe(
        switchMap(({ visits, salons, services, ratings }) => {
          console.log(visits, salons, services)
          this.serviceMap = this.serviceService.getServiceMap();
          this.salonMap = this.salonService.getSalonMap();
          this.visits = this.visitService.getVisits();
          this.employeeMap = this.visitService.getEmployeeMap();
          this.visitMap.clear();
          this.visits.forEach((visit) => {
            this.visitMap.set(visit.visitID, visit);
          });

          this.ratingMap.clear();
          ratings.forEach((rating) => {
            this.ratingMap.set(rating.visitID, rating);
          })

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
          this.openSnackBar("Coś poszło nie tak, odśwież stronę")
        },
      });
  }

  isFutureTime(dateString: string, timeString: string): boolean {
    const combinedDate = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    return combinedDate.getTime() > now.getTime();
  }

  cancelVisit(visitID: number) {
    this.confirmDialogService
      .confirm({
        title: 'Anuluj wizytę',
        message: `Czy jesteś pewny, że chcesz anulować tą wizytę?`,
        confirmText: 'Tak',
        cancelText: 'Nie',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.visitService.cancelVisitCustomer(visitID).subscribe({
            next: (response) => {
              console.log('Visit canceled successfully:', response);
              window.location.reload();
            },
            error: (error) => {
              console.error('Error canceling visit:', error);
              this.openSnackBar("Coś poszło nie tak, odśwież stronę")
            },
          });
        } else {
          console.log('Visit cancellation aborted.');
        }
      });
  }



}
