import { Injectable } from '@angular/core';
import L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: L.Map

  constructor() { }


  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  


}


