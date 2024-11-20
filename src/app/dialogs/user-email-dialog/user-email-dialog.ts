import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import { BarRatingModule } from 'ngx-bar-rating';


@Component({
    selector: 'user-email-dialog',
    templateUrl: 'user-email-dialog.html',
    styleUrl: 'user-email-dialog.css',
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
export class UserEmailDialog {


}
