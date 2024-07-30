import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visit } from '../../classes/visit/visit';
import { VisitService } from '../../classes/visit/visit.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-visits-dialog',
  standalone: true,
  imports: [ 
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    MatDividerModule
  ],
  templateUrl: './visits-dialog.component.html',
  styleUrl: './visits-dialog.component.css'
})
export class VisitsDialogComponent implements OnInit {
  // constructor(@Inject(MAT_DIALOG_DATA) public data : Visit[]) {}

  visits: Visit[] = [];

  constructor(private visitService: VisitService){}

  ngOnInit(): void {
    this.visits = this.visitService.getVisits();
  }

}
