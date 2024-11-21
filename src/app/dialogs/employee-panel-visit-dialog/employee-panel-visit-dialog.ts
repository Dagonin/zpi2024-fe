import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Visit } from '../../classes/visit/visit';
import { VisitService } from '../../classes/visit/visit.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeePanelComponent } from '../../employee-panel/employee-panel.component';

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
    templateUrl: './employee-panel-visit-dialog.html',
    styleUrl: './employee-panel-visit-dialog.css'
})
export class EmployeePanelVisitDialog implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(MatDialogRef<EmployeePanelComponent>) public dialogRef: any) {
    }

    ngOnInit(): void {
        console.log(this.data)
    }

    close() {
        this.dialogRef.close();
    }

    moveVisit() {
        this.dialogRef.close({
            event: this.data.event,
            flag: true
        });
    }

}
