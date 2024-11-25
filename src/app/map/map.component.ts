import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MapService } from './map.service';
import { SalonService } from '../classes/Salon/salon.service';
import { Salon } from '../classes/Salon/salon';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private mapService: MapService,
    public salonService: SalonService
  ) { }

  ngOnInit() {
    this.salonService.initializeSalons().subscribe({
      next: (response) => {
        this.addMarkersToMap();
      },
      error: (error) => {
        console.error('Failed to load salons:', error);
      }
    });
  }

  private addMarkersToMap() {
    const baseMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    // Initialize the map
    this.mapService.initializeMap('map', baseMapUrl);

    // Add markers for the salons
    this.salonService.salons.forEach((salon, index) => {
      this.mapService.addMarker([salon.longitude, salon.latitude], () => this.markerClick(index));
    });

    // Center and resize the map
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
