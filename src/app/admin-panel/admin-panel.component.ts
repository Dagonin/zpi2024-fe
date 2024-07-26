import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Place } from '../classes/place/place';
import { Barber } from '../classes/barber/barber';
import { MatListModule } from '@angular/material/list';
import { PlaceService } from '../classes/place/place.service';
import { BarberService } from '../classes/barber/barber.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatListModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  readonly panelOpenState = signal(false);

  places: Place[] = [];
  barbers: Barber[] = [];

  constructor(private placeService: PlaceService, private barberService: BarberService
  ){}

  ngOnInit(): void {
    this.places = this.placeService.getPlaces();
    this.barbers = this.barberService.getBarbers(); 
  }
}
