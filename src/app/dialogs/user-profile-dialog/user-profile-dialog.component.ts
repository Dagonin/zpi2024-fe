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
  badgeArray!: boolean[];

  ngOnInit() {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.customer = user
        console.log(user)
        this.visitService.getNumberOfFinishedVisitsByCustomerID(user.customerID).subscribe({
          next: (response) => {
            console.log(response)
            this.numberOfVisits = response
            this.badgeArray = this.getStampsArray();
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
    return Math.floor(this.numberOfVisits % 10);
  }


  getStampsArray(): boolean[] {
    const totalBadges = this.getNumberOfBadges();
    return Array(10)
      .fill(true, 0, totalBadges)
      .fill(false, totalBadges);
  }

  isRowBreak(index: number): boolean {
    return (index + 1) % 5 === 0;
  }

}
