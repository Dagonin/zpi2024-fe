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

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnDestroy {
  checkedPlace!: number;
  readonly dialog = inject(MatDialog);
  ratingsMap: Map<number, Rating[]> = new Map();
  avgRatingsMap: Map<number, any> = new Map();
  constructor(
    private cdr: ChangeDetectorRef,
    private mapService: MapService,
    public salonService: SalonService,
    private ratingService: RatingService
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
        ratings: this.ratingsMap.get(salonID)
      },
      height: '400px',
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
