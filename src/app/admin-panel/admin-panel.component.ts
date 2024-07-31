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
import { AddBarberDialogComponent } from '../dialogs/add-barber-dialog/add-barber-dialog.component';
import { EditPlaceDialogComponent } from '../dialogs/edit-place-dialog/edit-place-dialog.component';
import { AddPlaceDialogComponent } from '../dialogs/add-place-dialog/add-place-dialog.component';
import { DynamicDatabase, DynamicDataSource, DynamicFlatNode } from './admin-panel-places';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule
],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  readonly panelOpenState = signal(false);
  readonly panelOpenStateBarbers = signal(false);

  isAuthenticated: boolean = false;
  userRole: string = '';
  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  places: Place[] = [];
  barbers: Barber[] = [];

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(
    private placeService: PlaceService,
    private barberService: BarberService,
    public dialog: MatDialog,
    private database: DynamicDatabase,
    private authService: AuthService
  ){
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }


  openDialogContact(barber : Barber) {
    this.dialog.open(ContactInfoDialogComponent, {
      data: barber,
    });
  }

  openDialogEditBarber(barber: Barber){
    this.dialog.open(EditBarberDialogComponent,{
      data: barber,
    })
  }

  openDialogEditPlace(place: Place){
    console.log(place)
    this.dialog.open(EditPlaceDialogComponent,{
      data: place
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

  openDialogAddBarber(){
    this.dialog.open(AddBarberDialogComponent)
  }

  openDialogAddPlace(){
    this.dialog.open(AddPlaceDialogComponent)
  }

  ngOnInit(): void {
    this.places = this.placeService.getPlaces();
    this.barbers = this.barberService.getBarbers(); 
    this.userRole = this.authService.getRole();
    console.log(this.userRole)
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
    this.roleSubscription = this.authService.userRole$.subscribe(
      (userRole) => {
        this.userRole = userRole;
      }
    );
  }
}
