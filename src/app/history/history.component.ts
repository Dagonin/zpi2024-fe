import { Component, inject, OnInit } from '@angular/core';
import { VisitService } from '../classes/visit/visit.service';
import { Visit } from '../classes/visit/visit';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RatingDialogComponent } from '../dialogs/rating-dialog/rating-dialog.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {


  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(RatingDialogComponent);
  }

  constructor(public visitService: VisitService) { }


  ngOnInit(): void {
    this.visitService.initializeVisitsByCustomerID('1').subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
