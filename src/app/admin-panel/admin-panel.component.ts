import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Place } from '../classes/place/place';
import { Barber } from '../classes/barber/barber';
import { MatListModule } from '@angular/material/list';
import { PlaceService } from '../classes/place/place.service';
import { BarberService } from '../classes/barber/barber.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ContactInfoDialogComponent } from '../dialogs/contact-info-dialog/contact-info-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { EditBarberDialogComponent } from '../dialogs/edit-barber-dialog/edit-barber-dialog.component';
import { VisitsDialogComponent } from '../dialogs/visits-dialog/visits-dialog.component';
import { PlacesDialogComponent } from '../dialogs/places-dialog/places-dialog.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  readonly panelOpenState = signal(false);
  readonly panelOpenStateBarbers = signal(false);

  places: Place[] = [];
  barbers: Barber[] = [];

  constructor(
    private placeService: PlaceService,
    private barberService: BarberService,
    public dialog: MatDialog
  ){}


  openDialogContact(barber : Barber) {
    this.dialog.open(ContactInfoDialogComponent, {
      data: barber,
    });
  }

  openDialogEdit(barber: Barber){
    this.dialog.open(EditBarberDialogComponent,{
      data: barber,
    })
  }

  openDialogDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((confirmed : Boolean) => {
      console.log('The dialog was closed');
      console.log(confirmed);
    });
  }

  openDialogHistory(){
    this.dialog.open(VisitsDialogComponent)
  }

  openDialogPlaces(){
    this.dialog.open(PlacesDialogComponent,{
      data: this.places
    })
  }

  ngOnInit(): void {
    this.places = this.placeService.getPlaces();
    this.barbers = this.barberService.getBarbers(); 
  }
}
