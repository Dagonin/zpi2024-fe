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
import { ServiceCategoryDTO } from '../classes/service/service_categoryDTO';
import { MatCheckbox } from '@angular/material/checkbox';
import { ServiceService } from '../classes/service/service.service';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ServiceDTO } from '../classes/service/serviceDTO';

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
    MatAccordion,
    MatExpansionModule
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

  serviceCategories ! : ServiceCategoryDTO[];

  maxSelection = 3
  selectedServices: ServiceDTO[] = [];

  visitTime!: number;
  visitPrice!: number;


  startTime : [number,number] = [8,0]
  endTime : [number,number] = [20,15]

  //          hour    minute  is_disabled is_checked
  timeSlots: [number, number, boolean,    boolean][] = [];

  hoveredIndex: number | null = null;

protected dateFormGroup = new FormGroup({
  day: new FormControl('',Validators.required),
},{updateOn: 'blur'},) 

protected servicesFormGroup = new FormGroup({
  services: new FormControl(''),
},{updateOn: 'blur'},) 

protected secondFormGroup = new FormGroup({
  time_slot: new FormControl(-1,[Validators.required,Validators.min(0)]),
},{updateOn: 'blur'},) 

protected timePickerFormGroup = new FormGroup({
  time: new FormControl('',Validators.required)
})


  constructor(private route: ActivatedRoute, private placeService: PlaceService, private barberService: BarberService, private serviceService: ServiceService) {}


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
    this.place = this.placeService.getPlace(params['placeid']);
    console.log(this.place);
    this.barbers = this.barberService.getBarbers();

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 15);
    // this.serviceCategories = this.serviceCategory.getExampleServiceCategories();
    
    this.getServices()

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



  onCheckboxChange(service: ServiceDTO, event: any): void {
    if (event.checked) {
      if (this.selectedServices.length < this.maxSelection) {
        this.selectedServices.push(service);
      } else {
        event.source.checked = false;
        alert('You can only select up to 3 services.');
      }
    } else {
      this.selectedServices = this.selectedServices.filter(ser => ser.serviceID !== service.serviceID);
    }
    this.calculateServices();
  }

  clearSelected(): void{
    this.selectedServices = [];
    this.calculateServices();
  }

  isSelected(service: ServiceDTO): boolean {
    return this.selectedServices.includes(service);
  }

  isMaxSelected(): boolean {
    return this.selectedServices.length >= this.maxSelection;
  }
  

  calculateServices(){
    this.visitPrice = 0;
    this.visitTime = 0;
    this.selectedServices.forEach(service=>{
      this.visitPrice += service.servicePrice;
      this.visitTime += service.serviceSpan;
    })
  }


  generateTimeSlots(){
    let newTime = this.startTime;
    while(this.isTupleSmaller(newTime,this.endTime)){
      this.timeSlots.push([newTime[0],newTime[1],false,false]);
      newTime[1] = (newTime[1] + 15) % 60;
      if(newTime[1] == 0){
        newTime[0] += 1;
      }
    }

    this.disableTimeSlot(4);
    this.disableTimeSlot(7);
    this.disableTimeSlot(12);
    this.disableTimeSlot(33);
    this.disableTimeSlot(17);
    this.disableTimeSlot(1);
  }

  disableTimeSlot(index: number){
    this.timeSlots[index][2] = true;
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

selectTimeSlots(index: number){

  if(!this.checkIfDisabled(index)){
    this.timeSlots.forEach(x=>{
      x[3] = false;
    })
  
    for(let i = 0;i<this.visitTime;i++){
      this.timeSlots[index + i][3] = true;
    }

    this.secondFormGroup.setValue({
      time_slot: index
    })
  }
}

checkIfDisabled(index: number): boolean{
  let flag = false;
  for(let i=0;i<this.visitTime;i++){
    if(this.timeSlots[index+i][2]==true){
      flag = true;
      return flag;
    }
  }
  return flag;
}
 

getServices(){
  this.serviceService.getServicesFromSalon(1).subscribe({
    next: (response: any) => {
      console.log(response.listOfCategories);
      this.serviceCategories = response.listOfCategories
    },
    error: (error) => {
      console.error(error)
    }
  });
}


}
