import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
  selector: 'rating_dialog',
  templateUrl: 'rating-dialog.component.html',
  styleUrl: 'rating-dialog.component.css',
  standalone: true,
  imports: [
    MatDialogTitle,
    BarRatingModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    FormsModule
  ],
})
export class RatingDialogComponent {
  selectedRating: number | null = null;

  rateBarber(): void {
    if (this.selectedRating !== null) {
      console.log('Selected rating:', this.selectedRating / 2);
    } else {
      console.log('No rating selected');
    }
  }

}
