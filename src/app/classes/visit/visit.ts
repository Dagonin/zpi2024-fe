export class Visit {
    salonID: number;
    visitDate: string;
    visitStartTime: string;
    visitStatus: string;
    employeeID: number;
    customerID: number;
    visitID: number;



    constructor(salonID: number,
        visitDate: string,
        visitStartTime: string,
        visitStatus: string,
        employeeID: number,
        customerID: number,
        visitID: number
    ) {
        this.salonID = salonID;
        this.visitDate = visitDate;
        this.visitStartTime = visitStartTime;
        this.visitStatus = visitStatus;
        this.employeeID = employeeID;
        this.customerID = customerID;
        this.visitID = visitID
    }

}
