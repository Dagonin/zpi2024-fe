import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HistoryComponent } from '../../history/history.component';
import { Employee } from '../../classes/employee/employee';
import { MapService } from '../../map/map.service';
import { Salon } from '../../classes/Salon/salon';
import { TimeSlotsService } from '../../place/services/timeslots.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { OpeningHours } from '../../place/models/opening-hours';
import { Timeslot } from '../../place/models/timeslots';
import { format } from 'date-fns';
import { MatListModule } from '@angular/material/list';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SalonComponentService } from '../../place/services/salon-component.service';
import { VisitService } from '../../classes/visit/visit.service';
import { visit } from '../../place/models/visit';
import { ConfirmDialogSerice } from '../confirm-dialog/confirm-dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'customer-time-slots-dialog',
    standalone: true,
    providers: [
        provideNativeDateAdapter(),

    ],
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatButtonModule,
        CommonModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatListModule,
        MatInputModule,
    ],
    templateUrl: './customer-time-slots-dialog.html',
    styleUrl: './customer-time-slots-dialog.css'
})
export class CustomerTimeSlotsDialog implements OnInit {

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        @Inject(MatDialogRef<HistoryComponent>) public dialogRef: any,
        public timeslotsService: TimeSlotsService,
        private salonComponentService: SalonComponentService,
        private visitService: VisitService,
        private confirmDialogService: ConfirmDialogSerice
    ) {
    }

    startTime: [number, number] = [8, 0];
    endTime: [number, number] = [20, 15];
    openingHours!: OpeningHours[];

    hoveredIndex: number | null = null;

    employees: Employee[] = [];
    employee_timeslots!: Timeslot[];

    minDate!: Date;
    maxDate!: Date;
    visitTime!: number;
    allowedDates!: string[];
    pickedDate!: Date;
    private _snackBar = inject(MatSnackBar);


    openSnackBar(text: string) {
        this._snackBar.open(text, "", {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['error_snack']
        });

    }



    myFilter = (date: Date | null): boolean => {
        if (!date) {
            return false;
        }

        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const adjustedDate = new Date(date);
        adjustedDate.setDate(adjustedDate.getDate() + 1);

        if (adjustedDate <= tomorrow) {
            return false;
        }

        const dateString = adjustedDate.toISOString().split('T')[0];
        return this.allowedDates.includes(dateString);
    };


    ngOnInit(): void {
        console.log(this.data)
        this.visitTime = this.data.visitTime;
        this.getOpeningHours();
        this.getAllAvailabilityDates();
        this.generateTimeSlots();
    }

    generateTimeSlots() {
        this.timeslotsService.resetFormGroup()
        this.timeslotsService.resetTimeSlots()
        this.timeslotsService.getAllTimeslotsForAnEmployee(this.data.visit.employeeID).subscribe({
            next: (response: any) => {
                console.log(response)
                this.employee_timeslots = response;
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    getOpeningHours() {
        this.timeslotsService.getAllOpeningHoursForSalon(this.data.visit.salonID).subscribe({
            next: (response: any) => {
                this.openingHours = response;
                this.timeslotsService.generateTimeSlots(this.startTime, this.endTime);
            },
            error: (error) => {
                console.error(error)
            }
        })
    }


    getAllAvailabilityDates() {
        this.salonComponentService.getAllAvailabilityDatesForEmployee(this.data.visit.salonID, this.data.visit.employeeID).subscribe({
            next: (response: any) => {
                console.log(response);
                this.allowedDates = response;
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    close() {
        this.dialogRef.close();
    }

    enableTimeSlots() {
        let dayValue = this.timeslotsService.timeslotsFormGroup.controls.day.value;
        if (dayValue) {
            let date = dayValue;
            let weekday = date?.getDay()
            let openingHours = this.openingHours[weekday - 1]
            this.timeslotsService.resetTimeSlots();
            this.timeslotsService.enableTimeslotsInRange(openingHours.openingHour, openingHours.closingHour)
            this.employee_timeslots.forEach(ts => {
                if (format(new Date(ts.timeSlotDate), 'dd MM yyyy') == format(date, 'dd MM yyyy')) {
                    this.timeslotsService.disableTimeSlotStr(ts.timeSlotTime);
                }
            })
        }
    }

    onMouseEnter(index: number): void {
        this.hoveredIndex = index;
    }

    onMouseLeave(): void {
        this.hoveredIndex = null;
    }


    selectTimeSlots(index: number) {
        this.timeslotsService.selectTimeSlots(index, this.visitTime);
    }

    rescheduleVisit() {
        const startTime = this.timeslotsService.indexToHour(
            this.timeslotsService.timeslotsFormGroup.controls.time_slot.value
        ) + ":00";

        let date = this.timeslotsService.timeslotsFormGroup.controls.day.value;
        date?.setHours(1);
        if (date) {
            this.confirmDialogService
                .confirm({
                    title: 'Przełóż wizytę',
                    message: `Czy jesteś pewny, że chcesz przełożyc tą wizytę?`,
                    confirmText: 'Tak',
                    cancelText: 'Nie',
                })
                .subscribe((confirmed) => {
                    if (confirmed) {
                        this.visitService.rescheduleVisit(this.data.visit.visitID, startTime, date.toISOString().split('T')[0], this.data.visit.customerID, "C").subscribe({
                            next: (response) => {
                                console.log('Visit rescheduled successfully:', response);
                                // Reload the page
                                window.location.reload();
                            },
                            error: (error) => {
                                console.error('Error rescheduling visit:', error);
                                this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                            },
                        });
                    } else {
                        console.log('Reschedule action canceled.');
                    }
                });
        }
    }


    remakeAppointment() {
        let date = this.timeslotsService.timeslotsFormGroup.controls.day.value;
        date?.setHours(1);

        if (date) {
            const newVisit = new visit(
                this.data.visit.salonID,
                date.toISOString().split('T')[0],
                this.timeslotsService.indexToHour(this.timeslotsService.timeslotsFormGroup.controls.time_slot.value) + ":00",
                'RESERVED',
                this.data.visit.employeeID,
                this.data.visit.customerID,
                this.data.services
            );
            this.confirmDialogService
                .confirm({
                    title: 'Umów ponownie',
                    message: `Czy jesteś pewny, że chcesz się umówić ponownie?`,
                    confirmText: 'Tak',
                    cancelText: 'Nie',
                })
                .subscribe((confirmed) => {
                    if (confirmed) {
                        this.salonComponentService.makeAppointment(newVisit).subscribe({
                            next: (response: any) => {
                                console.log('Appointment remade successfully:', response);
                                window.location.reload();
                            },
                            error: (error) => {
                                console.error('Error remaking appointment:', error);
                                this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                            },
                        });
                    } else {
                        console.log('Remake action canceled.');
                    }
                });
        }
    }



}
