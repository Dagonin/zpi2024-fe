import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Place } from '../classes/place/place';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { PlaceService } from '../classes/place/place.service';
import { RouterLink } from '@angular/router';
import { MapService } from './map.service';

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
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  places: Place[] = [];
  checkedPlace: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private placeService: PlaceService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.places = this.placeService.getPlaces();
    this.places.forEach(place => (place.checked = false));
  }

  ngAfterViewInit() {
    const baseMapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    this.mapService.initializeMap('map', baseMapUrl);

    this.places.forEach((place, index) => {
      this.mapService.addMarker(place.coords, () => this.markerClick(index));
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
    this.places.forEach((place, i) => {
      if (i === index) {
        place.checked = state;
        this.checkedPlace = place.id;
      } else {
        place.checked = false;
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
