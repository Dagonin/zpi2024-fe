import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Visit } from '../../classes/visit/visit';
import { VisitService } from '../../classes/visit/visit.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeePanelComponent } from '../../employee-panel/employee-panel.component';
import { ConfirmDialogSerice } from '../confirm-dialog/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from '../../classes/service/service.service';
import { MatIconModule } from '@angular/material/icon';
import { ServiceDTO } from '../../classes/service/serviceDTO';

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
        MatDividerModule,
        MatIconModule
    ],
    templateUrl: './employee-panel-visit-dialog.html',
    styleUrl: './employee-panel-visit-dialog.css'
})
export class EmployeePanelVisitDialog implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(MatDialogRef<EmployeePanelComponent>) public dialogRef: any,
        private visitService: VisitService,
        private confirmDialogService: ConfirmDialogSerice,
    ) {
    }


    private _snackBar = inject(MatSnackBar);


    openSnackBar(text: string) {
        this._snackBar.open(text, "", {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['error_snack']
        });

    }

    calculateServicesPrice() {
        let price = 0;

        this.data.event.meta.services.forEach((service: ServiceDTO) => {
            price += service.servicePrice;
        })

        return price;
    }

    calculateServicesTime() {
        let time = 0;

        this.data.event.meta.services.forEach((service: ServiceDTO) => {
            time += service.serviceSpan * 15;
        })

        return time;
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

    cancelVisit() {
        this.confirmDialogService
            .confirm({
                title: 'Anuluj wizytę',
                message: `Czy jesteś pewny, że chcesz anulować tą wizytę?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    // Proceed with API call if confirmed
                    this.visitService.cancelVisitEmployee(this.data.event.meta.visitID).subscribe({
                        next: (response) => {
                            console.log('Visit canceled successfully:', response);
                            window.location.reload();
                        },
                        error: (error) => {
                            console.error('Error canceling visit:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('Visit cancellation aborted.');
                }
            });
    }


}
