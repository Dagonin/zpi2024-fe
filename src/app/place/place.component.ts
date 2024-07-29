import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, min, Observable, switchMap } from 'rxjs';
import { Place } from '../classes/place/place';
import { PlaceService } from '../classes/place/place.service';
import L from 'leaflet';
import { BarberService } from '../classes/barber/barber.service';
import { Barber } from '../classes/barber/barber';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-place',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent implements OnInit, OnDestroy {

  private map!: L.Map
  place!: Place;
  private sub: any;
  marker!: L.Marker;
  barbers: Barber[] = [];
  minDate! : Date;
  maxDate! : Date;


  constructor(private route: ActivatedRoute, private placeService: PlaceService, private barberService: BarberService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.place = this.placeService.getPlace(params['placeid']);
    console.log(this.place);
    this.barbers = this.barberService.getBarbers();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);

    });
  }

  ngAfterViewInit() {
    
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.map.remove();
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('mapp');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private addMarkers() {
    this.marker = L.marker(this.place.coords)
    this.marker.addTo(this.map)
  }

  centerMap(){
    this.zoomOnCoords(this.place.coords);
  }

  zoomOnCoords(coords : [number,number]){
    this.map.setView({lat: coords[0],lng: coords[1]}, 16);
  }

  

}
