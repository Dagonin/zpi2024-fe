import { Component } from '@angular/core';
import { VisitService } from '../../classes/visit/visit.service';
import { AuthService } from '../../auth/auth.service';
import { CustomerDTO } from '../../classes/customer/customerDTO';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './user-profile-dialog.component.html',
  styleUrl: './user-profile-dialog.component.css'
})
export class UserProfileDialogComponent {

  constructor(private visitService: VisitService, private authService: AuthService) { }

  numberOfVisits: number = 0;
  customer!: CustomerDTO


  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.customer = user
        this.visitService.getNumberOfFinishedVisitsByCustomerID(user.customerID).subscribe({
          next: (response) => {
            this.numberOfVisits = response
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getNumberOfBadges(): number {
    return Math.floor(this.numberOfVisits / 10); // 1 badge for each 10 visits
  }


  getStampsArray(): boolean[] {
    const totalBadges = this.getNumberOfBadges();
    return Array(10)
      .fill(true, 0, totalBadges) // Filled stars for earned badges
      .fill(false, totalBadges); // Empty stars for remaining badges
  }

  isRowBreak(index: number): boolean {
    return (index + 1) % 5 === 0; // Break after every 5 items
  }

}
