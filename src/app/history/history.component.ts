import { Component, OnInit } from '@angular/core';
import { VisitService } from '../classes/visit/visit.service';
import { Visit } from '../classes/visit/visit';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatListModule,
    CommonModule
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {

  visits : Visit[] = [];

  constructor(private visitService: VisitService){}

  ngOnInit(): void {
      this.visits = this.visitService.getVisits();
      console.log(this.visits)
  }

}
