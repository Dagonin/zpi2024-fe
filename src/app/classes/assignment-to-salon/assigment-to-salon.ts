export class AssignmentToSalon {
    assignmentID: number;
    assignmentDate: string;
    salonID: number;
    employeeID: number;

    constructor(assignmentID: number, assignmentDate: string, salonID: number, employeeID: number) {
        this.assignmentID = assignmentID;
        this.assignmentDate = assignmentDate;
        this.salonID = salonID;
        this.employeeID = employeeID;
    }
}