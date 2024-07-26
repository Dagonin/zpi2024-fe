import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, viewChild, ViewChildren } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import * as L from 'leaflet';
import { Place } from './place';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { P } from '@angular/cdk/keycodes';
L.Icon.Default.imagePath = 'assets/leaflet/';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonToggleModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map
  

  places: Place[] = [
    new Place('Kraków', '30-610', 'Konstantego Jelskiego 11', [49.99919, 19.94411],false),
    new Place('Katowice', '40-526', 'Meteorologów 13', [50.24043, 19.01211],false),
    new Place('Wrocław', '51-670', 'Edwarda Dembowskiego', [51.10656, 17.09845],false)
  ];

  markers: L.Marker[] = [
    L.marker([49.99919, 19.94411]), // 11, Konstantego Jelskiego, Kraków, województwo małopolskie, 30-610, Polska
    L.marker([50.24043, 19.01211]), // 13, Meteorologów, Katowice, Górnośląsko-Zagłębiowska Metropolia, województwo śląskie, 40-526, Polska
    L.marker([51.10656, 17.09845]) ,// 60, Edwarda Dembowskiego, Wrocław, województwo dolnośląskie, 51-670, Polska
  ];

  

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    // Add your markers to the map
    this.markers.forEach((marker,i) => {
      marker.addTo(this.map).on('click', () => this.markerClick(marker,i));
        }
    );
  }


  resetMarkersColor(){
    let icons = Array.from(document.getElementsByClassName('leaflet-marker-icon'));
    icons.forEach(icon=>{
      (icon as HTMLElement).style.filter = "hue-rotate(0deg)"
    })
  }

  // Changes color of selected marker, and resets rest
  markerClick(marker: any,index: number){
    this.resetMarkersColor();
    marker._icon.style.filter = "hue-rotate(180deg)";
    this.updatePlaceCheckedState(index, true);
  }



  updatePlaceCheckedState(index: number, state: boolean) {
    this.places.forEach((place, i) => {
      place.checked = (i === index) ? state : false;
    });
    this.cdr.detectChanges();
  }



  selectPlace(coords : [number,number],index: number){
    // this.zoomOnCoords(coords);
    this.resetMarkersColor();
    (this.markers[index] as any)._icon.style.filter = "hue-rotate(180deg)";
    this.updatePlaceCheckedState(index, true);
  }



  centerMap() {
    // Create a LatLngBounds object to encompass all the marker locations
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    // Fit the map view to the bounds
    this.map.fitBounds(bounds);
  }

  // Zooms on probided coordinates
  zoomOnCoords(coords : [number,number]){
    this.map.setView({lat: coords[0],lng: coords[1]}, 13);
  }

}