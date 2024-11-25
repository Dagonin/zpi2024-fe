import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { HistoryComponent } from '../../history/history.component';
import { Employee } from '../../classes/employee/employee';
import { MapService } from '../../map/map.service';
import { Salon } from '../../classes/Salon/salon';

@Component({
    selector: 'history-details-dialog',
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
    templateUrl: './history-details-dialog.html',
    styleUrl: './history-details-dialog.css'
})
export class HistoryDetailsDialog implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(MatDialogRef<HistoryComponent>) public dialogRef: any, private mapService: MapService) {
    }

    salon!: Salon;

    ngOnInit(): void {
        this.salon = this.data.salon
        console.log(this.salon)
        this.initializeMap();
    }

    close() {
        this.dialogRef.close();
    }


    private initializeMap(): void {
        this.mapService.initializeMap('mapp', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        this.centerMap();
        this.mapService.addMarker([this.salon.longitude, this.salon.latitude]);
    }

    centerMap() {
        this.mapService.zoomOnCoords([this.salon.longitude, this.salon.latitude]);
    }


}
