import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
  selector: 'rating_dialog',
  templateUrl: 'rating_dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    BarRatingModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class RatingDialogComponent {
  rating: number = 5;



  rateBarber(){
    console.log(this.rating)
  }

}
