import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, viewChild, ViewChildren } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import * as L from 'leaflet';
import { Place } from '../classes/place/place';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { P } from '@angular/cdk/keycodes';
import { PlaceService } from '../classes/place/place.service';
import { RouterLink } from '@angular/router';
L.Icon.Default.imagePath = 'assets/leaflet/';

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
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map
  

  places: Place[] = [];

  markers: L.Marker[] = [];

  checkedPlace: string = '';  


  constructor(private cdr: ChangeDetectorRef, private placeService: PlaceService) { }

  ngOnInit() {
    this.places = this.placeService.getPlaces();
    this.places.forEach(place =>{
      let mark = L.marker(place.coords)
      this.markers.push(mark);
    })
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
      if(i === index){
        place.checked = state;
        this.checkedPlace = place.id;
      }else{
        place.checked = false;
      }
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