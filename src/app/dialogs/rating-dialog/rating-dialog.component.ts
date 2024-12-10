import { CdkTextareaAutosize, TextFieldModule } from "@angular/cdk/text-field";
import { afterNextRender, Component, inject, Inject, Injector, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BarRatingModule } from 'ngx-bar-rating';
import { RatingService } from "../../classes/rating/rating.service";
import { HistoryComponent } from "../../history/history.component";
import { Rating } from "../../classes/rating/rating";


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
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule
  ],
})
export class RatingDialogComponent {
  selectedRating: number | null = null;
  text: string = '';

  private _injector = inject(Injector);

  constructor(private ratingService: RatingService, @Inject(MAT_DIALOG_DATA) public data: any, @Inject(MatDialogRef<HistoryComponent>) public dialogRef: any) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    afterNextRender(
      () => {
        this.autosize.resizeToFitContent(true);
      },
      {
        injector: this._injector,
      },
    );
  }

  ngOnInit(): void {
    console.log(this.data)
    this.text = this.data.rating.ratingOpinion;
    this.selectedRating = this.data.rating.ratingValue
  }

  close() {
    this.dialogRef.close();
  }


  rateBarber(): void {
    if (this.selectedRating !== null) {
      console.log('Selected rating:', this.selectedRating / 2);
      console.log(this.text)

      const rating = new Rating(14443, this.selectedRating / 2, this.text, this.data.employee.employeeID, this.data.visit.visitID);
      console.log(rating);
      this.ratingService.addRatingToDatabase(rating).subscribe({
        next(value) {
          console.log(value)
          window.location.reload();
        },
        error(error) {
          console.log(error)
        },
      })
    } else {
      console.log('No rating selected');
    }
  }

}
