import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Visit } from '../../classes/visit/visit';
import { VisitService } from '../../classes/visit/visit.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeePanelComponent } from '../../employee-panel/employee-panel.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CustomerService } from '../../classes/customer/customer.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SalonService } from '../../classes/Salon/salon.service';
import { Salon } from '../../classes/Salon/salon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
    selector: 'find-client-dialog',
    standalone: true,
    imports: [
        MatDialogContent,
        MatButtonModule,
        CommonModule,
        MatDividerModule,
        MatInputModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatSelectModule
    ],
    templateUrl: './find-client-dialog.html',
    styleUrl: './find-client-dialog.css'
})
export class FindClientDialog implements OnInit {

    foundFlag = 0;
    salons: Salon[] = [];
    userId!: number;

    form = new FormGroup({
        email: new FormControl(),
        salon: new FormControl(),
    });


    constructor(@Inject(MatDialogRef<EmployeePanelComponent>) public dialogRef: any, private customerService: CustomerService, private salonService: SalonService, private router: Router) {
    }

    ngOnInit(): void {
        this.salons = this.salonService.getSalons();
    }

    checkIfExists() {
        this.foundFlag = 3;
        this.customerService.getCustomerByEmail(this.form.getRawValue().email).subscribe({
            next: (response) => {
                this.foundFlag = 1;
                console.log(response);
                this.userId = response.customerID;
            },
            error: (error) => {
                this.foundFlag = 2;
                console.log(error);
            },
        });
    }

    redirect() {
        // TODO id uzytkowika
        this.router.navigate([`/place/${this.form.getRawValue().salon}/${this.userId}`])
        this.dialogRef.close();
    }


}
