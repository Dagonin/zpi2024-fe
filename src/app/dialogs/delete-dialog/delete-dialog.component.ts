import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { BarRatingModule } from 'ngx-bar-rating';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [    
    MatDialogTitle,
    BarRatingModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {

  constructor(private dialog: MatDialogRef<DeleteDialogComponent>){}

  confirmDelete(){
    this.dialog.close(true);
  }
}
