import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogData, ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogSerice {
    constructor(private dialog: MatDialog) { }

    confirm(data: ConfirmationDialogData): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data
        });
        return dialogRef.afterClosed();
    }
}
