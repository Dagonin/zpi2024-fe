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
import { MatStepperModule } from '@angular/material/stepper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceCategoryService } from '../classes/service/service_category.service';
import { ServiceCategoryDTO } from '../classes/service/service_categoryDTO';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-place',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckbox,
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

  serviceCategories : ServiceCategoryDTO[] = [];
  maxSelection = 3
  selectedCategories: number[] = [];

  startTime : [number,number] = [8,0]
  endTime : [number,number] = [20,15]
  timeSlots: [number, number, boolean][] = [];

  hoveredIndex: number | null = null;
  hoverCount: number = 5;

protected firstFormGroup = new FormGroup({
  day: new FormControl('',Validators.required),
},{updateOn: 'blur'},) 

protected secondFormGroup = new FormGroup({
  day: new FormControl('',Validators.required),
},{updateOn: 'blur'},) 

protected timePickerFormGroup = new FormGroup({
  time: new FormControl('',Validators.required)
})


  constructor(private route: ActivatedRoute, private placeService: PlaceService, private barberService: BarberService, private serviceCategory : ServiceCategoryService) {}


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.place = this.placeService.getPlace(params['placeid']);
    console.log(this.place);
    this.barbers = this.barberService.getBarbers();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);
    this.serviceCategories = this.serviceCategory.getExampleServiceCategories();
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



  onCheckboxChange(category: ServiceCategoryDTO, event: any): void {
    if (event.checked) {
      if (this.selectedCategories.length < this.maxSelection) {
        this.selectedCategories.push(category.serviceCategoryId!);
      } else {
        event.source.checked = false;
        alert('You can only select up to 3 categories.');
      }
    } else {
      this.selectedCategories = this.selectedCategories.filter(id => id !== category.serviceCategoryId);
    }
  }

  isSelected(category: ServiceCategoryDTO): boolean {
    return this.selectedCategories.includes(category.serviceCategoryId!);
  }

  isMaxSelected(): boolean {
    return this.selectedCategories.length >= this.maxSelection;
  }
  
  generateTimeSlots(){
    console.log('generator')
    let newTime = this.startTime;
    while(this.isTupleSmaller(newTime,this.endTime)){
      this.timeSlots.push([newTime[0],newTime[1],false]);
      newTime[1] = (newTime[1] + 15) % 60;
      if(newTime[1] == 0){
        newTime[0] += 1;
      }
      
    }
  }

  isTupleSmaller(a: [number, number], b: [number, number]): boolean {
    if (a[0] < b[0]) {
        return true;
    } else if (a[0] >= b[0]) {
        return false;
    } else {
        return a[1] <= b[1];
    }
}

onMouseEnter(index: number): void {
  this.hoveredIndex = index;
}

onMouseLeave(): void {
  this.hoveredIndex = null;
}
 


}
