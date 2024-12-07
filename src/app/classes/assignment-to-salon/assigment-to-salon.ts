export class AssignmentToSalon {
    assigmentID: number;
    assigmentDate: string;
    salonID: number;
    employeeID: number;

    constructor(assigmentID: number, assigmentDate: string, salonID: number, employeeID: number) {
        this.assigmentID = assigmentID;
        this.assigmentDate = assigmentDate;
        this.salonID = salonID;
        this.employeeID = employeeID;
    }
}