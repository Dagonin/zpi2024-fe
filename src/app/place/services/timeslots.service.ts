import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class TimeSlotsService {
    constructor(private http: HttpClient) { }

    //          hour    minute  is_disabled is_checked
    timeSlots: [number, number, boolean, boolean][] = [];


    timeslotsFormGroup = new FormGroup({
        time_slot: new FormControl(-1, [Validators.required, Validators.min(0)]),
        day: new FormControl<Date | null>(null, Validators.required)
    }, { updateOn: 'blur' },)



    generateTimeSlots(startTime: [number, number], endTime: [number, number]) {
        let newTime = startTime;
        while (this.isTupleSmaller(newTime, endTime)) {
            this.timeSlots.push([newTime[0], newTime[1], true, false]);
            newTime[1] = (newTime[1] + 15) % 60;
            if (newTime[1] == 0) {
                newTime[0] += 1;
            }
        }
    }

    isTupleSmaller(a: [number, number], b: [number, number]): boolean {
        if (a[0] < b[0]) {
            return true;
        } else if (a[0] >= b[0]) {
            return false;
        } else {
            return a[1] <= b[1];
        }
    }


    selectTimeSlots(index: number, visitTime: number) {
        if (!this.checkIfDisabled(index, visitTime) && this.timeslotsFormGroup.controls.day.value) {
            this.timeSlots.forEach(x => {
                x[3] = false;
            })

            for (let i = 0; i < visitTime; i++) {
                this.timeSlots[index + i][3] = true;
            }

            this.timeslotsFormGroup.controls.time_slot.setValue(index);
        }
    }


    resetTimeSlots() {
        this.timeSlots.forEach(x => {
            x[2] = true;
            x[3] = false;
        })
    }

    resetFormGroup() {
        this.timeslotsFormGroup.setValue({ time_slot: -1, day: null })
    }

    enableTimeslotsInRange(openingHour: string, closingHour: string) {
        const openingHourTuple = this.convertTimeToTuple(openingHour);
        const closingHourTuple = this.convertTimeToTuple(closingHour);
        const openinHourIndex = this.calculateTimeslotIndex(openingHourTuple);
        const closingHourIndex = this.calculateTimeslotIndex(closingHourTuple);

        for (let i = openinHourIndex; i < closingHourIndex; i++) {
            this.timeSlots[i][2] = false;
        }

        return (this.calculateTimeslotIndex(openingHourTuple))
    }

    indexToHour(index: number | null): string {
        if (index && index > 0) {
            let time_slot = this.timeSlots[index];
            if (time_slot[1] == 0) {
                return time_slot[0].toString().padStart(2, '0') + ":00"
            } else {
                return time_slot[0].toString().padStart(2, '0') + ":" + time_slot[1]
            }

        }
        return ""
    }

    convertTimeToTuple(time: string): [number, number] {
        const [hour, minute] = time.split(':').map(Number);
        return [hour, minute];
    }


    calculateTimeslotIndex(time: [number, number]): number {
        const startMinutes = this.timeSlots[0][0] * 60 + this.timeSlots[0][1];
        const targetMinutes = time[0] * 60 + time[1];

        const index = (targetMinutes - startMinutes) / 15;

        return index;
    }


    checkIfDisabled(index: number, visitTime: number): boolean {
        let flag = false;
        for (let i = 0; i < visitTime; i++) {
            if (this.timeSlots[index + i][2] == true) {
                flag = true;
                return flag;
            }
        }
        return flag;
    }


    disableTimeSlotStr(time: string) {
        const tuple = this.convertTimeToTuple(time);
        this.disableTimeSlot(this.calculateTimeslotIndex(tuple));
    }

    disableTimeSlot(index: number) {
        this.timeSlots[index][2] = true;
    }

    enableTimeSlot(index: number) {
        this.timeSlots[index][2] = false;
    }





    api_url = `http://localhost:8080/api/crud/appointment-making`

    getAllOpeningHoursForSalon(salonID: string) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        return this.http.get<string>(`${this.api_url}/opening-hours/${salonID}`, httpOptions)
    }

    getAllTimeslotsForAnEmployee(employeeID: number | null) {
        const httpOptions =
        {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        }
        return this.http.get<string>(`${this.api_url}/time-slots/${employeeID}`, httpOptions)
    }



}