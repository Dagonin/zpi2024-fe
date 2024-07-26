import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { Place } from '../classes/place/place';
import { PlaceService } from '../classes/place/place.service';
import L from 'leaflet';
import { BarberService } from '../classes/barber/barber.service';
import { Barber } from '../classes/barber/barber';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent implements OnInit {

  private map!: L.Map
  place!: Place;
  private sub: any;
  marker!: L.Marker;
  barbers: Barber[] = [];

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private barberService: BarberService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.place = this.placeService.getPlace(params['placeid']);
    console.log(this.place);

      // load barber list of this place
      this.barbers = this.barberService.getBarbers();
    });
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
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
