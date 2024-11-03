import { Injectable } from '@angular/core';
import L from 'leaflet';
import { icon, Marker } from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {

  private map!: L.Map;
  private markers: L.Marker[] = [];



  initializeMap(mapId: string, baseMapUrl: string) {
    this.markers = [];
    console.log(this.markers)
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;
    this.map = L.map(mapId);
    L.tileLayer(baseMapUrl).addTo(this.map);
  }

  addMarker(coords: [number, number], onClick?: () => void) {
    const marker = L.marker(coords);
    if (onClick) {
      marker.on('click', onClick);
    }
    marker.addTo(this.map);
    this.markers.push(marker);
  }



  setMarkerColor(index: number, colorFilter: string) {
    const markerElement = this.markers[index].getElement();
    if (markerElement) {
      markerElement.style.filter = colorFilter;
    }
  }


  resetMarkersColor() {
    let icons = Array.from(document.getElementsByClassName('leaflet-marker-icon'));
    icons.forEach(icon => {
      (icon as HTMLElement).style.filter = "hue-rotate(0deg)"
    })
  }

  zoomOnCoords(coords: [number, number]) {
    this.map.setView({ lat: coords[0], lng: coords[1] }, 16);
  }

  invalidateMapSize() {
    this.map.invalidateSize();
  }

  removeMap() {
    this.map.remove();
  }


  centerMap() {
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    this.map.fitBounds(bounds);
  }


}
