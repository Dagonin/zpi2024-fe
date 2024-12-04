import { CdkTextareaAutosize, TextFieldModule } from "@angular/cdk/text-field";
import { afterNextRender, Component, inject, Inject, Injector, ViewChild } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BarRatingModule } from 'ngx-bar-rating';
import { RatingService } from "../../classes/rating/rating.service";

import { MapComponent } from "../../map/map.component";
import { MatListModule } from "@angular/material/list";
import { MatDivider } from "@angular/material/divider";

@Component({
    selector: 'salon-ratings-dialog',
    templateUrl: 'salon-ratings-dialog.html',
    styleUrl: 'salon-ratings-dialog.css',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
        MatListModule,
        MatDivider
    ],
})
export class SalonRatingsDialog {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(MatDialogRef<MapComponent>) public dialogRef: any, private ratingService: RatingService) {
    }


    ngOnInit(): void {
        console.log(this.data)
    }

    close() {
        this.dialogRef.close();
    }


}
