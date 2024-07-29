import { Component, Inject } from '@angular/core';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Barber } from '../../classes/barber/barber';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contact-info-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './contact-info-dialog.component.html',
  styleUrl: './contact-info-dialog.component.css'
})
export class ContactInfoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data : Barber) {}
}
