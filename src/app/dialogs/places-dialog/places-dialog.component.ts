import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Place } from '../../classes/place/place';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-places-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    CommonModule,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './places-dialog.component.html',
  styleUrl: './places-dialog.component.css'
})
export class PlacesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data : Place[]) {} 
}
