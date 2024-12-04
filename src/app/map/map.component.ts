import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MapService } from './map.service';
import { SalonService } from '../classes/Salon/salon.service';
import { Salon } from '../classes/Salon/salon';
import { RatingService } from '../classes/rating/rating.service';
import { Rating } from '../classes/rating/rating';
import { MatDialog } from '@angular/material/dialog';
import { HistoryDetailsDialog } from '../dialogs/history-details-dialog/history-details-dialog';
import { SalonRatingsDialog } from '../dialogs/salon-ratings-dialog/salon-ratings-dialog';
import { ServiceService } from '../classes/service/service.service';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnDestroy {
  checkedPlace!: number;
  readonly dialog = inject(MatDialog);
  ratingsMap: Map<number, Rating[]> = new Map();
  avgRatingsMap: Map<number, any> = new Map();
  servicesOfRatingsMap: Map<number, Map<number, string[]>> = new Map();
  constructor(
    private cdr: ChangeDetectorRef,
    private mapService: MapService,
    public salonService: SalonService,
    private ratingService: RatingService,
    private serviceSerivce: ServiceService
  ) { }

  ngOnInit() {
    this.salonService.initializeSalons().subscribe({
      next: () => {
        this.addMarkersToMap();


        const salons = this.salonService.getSalons();
        salons.forEach((salon) => {
          this.loadSalonRatings(salon.salonID);
        });

      },
      error: (error) => {
        console.error('Failed to load salons:', error);
      }
    });

  }

  private loadSalonRatings(salonID: number): void {
    const handleError = (error: any, type: string) => {
      console.error(`Error fetching ${type} for salonID ${salonID}:`, error);
    };

    this.ratingService.getAllRatingForSalon(salonID).subscribe({
      next: (response) => {
        this.ratingsMap.set(salonID, response)
      },
      error: (err) => handleError(err, 'all ratings')
    });

    this.ratingService.getAverageRatingForSalon(salonID).subscribe({
      next: (response) => {
        this.avgRatingsMap.set(salonID, response)
      },
      error: (err) => handleError(err, 'average rating')
    });

    this.serviceSerivce.getAllServicesForSalon(salonID).subscribe({
      next: (servicesInVisit) => {
        const distinctServiceIDs = this.serviceSerivce.getDistinctIDs(servicesInVisit);

        this.serviceSerivce.getAllServicesByListOfIds(distinctServiceIDs).subscribe({
          next: (services) => {
            const servicesMap = new Map(
              services.map(service => [service.serviceID, service.serviceDescription])
            );

            const servicesInVisitMap = new Map<number, string[]>();

            servicesInVisit.forEach((entry: { serviceID: number; visitID: number; }) => {
              const serviceDescription = servicesMap.get(entry.serviceID);
              if (serviceDescription) {
                if (!servicesInVisitMap.has(entry.visitID)) {
                  servicesInVisitMap.set(entry.visitID, []);
                }
                servicesInVisitMap.get(entry.visitID)?.push(serviceDescription);
              }
            });

            this.servicesOfRatingsMap.set(salonID, servicesInVisitMap);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => handleError(err, 'average rating'),
    });


  }
  private addMarkersToMap() {
    const baseMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    this.mapService.initializeMap('map', baseMapUrl);

    this.salonService.salons.forEach((salon, index) => {
      this.mapService.addMarker([salon.longitude, salon.latitude], () => this.markerClick(index));
    });

    this.mapService.centerMap();
    this.mapService.invalidateMapSize();
  }
  markerClick(index: number) {
    this.mapService.resetMarkersColor();
    this.mapService.setMarkerColor(index, 'hue-rotate(180deg)');
    this.updatePlaceCheckedState(index, true);
  }

  updatePlaceCheckedState(index: number, state: boolean) {
    this.salonService.salons.forEach((salon, i) => {
      if (i === index) {
        salon.checked = state;
        this.checkedPlace = salon.salonID;
      } else {
        salon.checked = false;
      }
    });
    this.cdr.detectChanges();
  }

  showRatings(salonID: number) {
    const dialogRef = this.dialog.open(SalonRatingsDialog, {
      data: {
        salon: this.salonService.salonMap.get(salonID),
        ratings: this.ratingsMap.get(salonID),
        services: this.servicesOfRatingsMap.get(salonID)
      },
      height: '800px',
      width: '600px',
    });
  }

  selectPlace(coords: [number, number], index: number) {
    this.mapService.resetMarkersColor();
    this.mapService.setMarkerColor(index, 'hue-rotate(180deg)');
    this.updatePlaceCheckedState(index, true);
  }

  ngOnDestroy(): void {
    this.mapService.removeMap();
  }

  centerMap() {
    this.mapService.centerMap();
  }
}
