export class visit {
    salonID: number;
    visitDate: string;
    visitStartTime: string;
    visitStatus: string;
    employeeID: number;
    customerID: number;
    serviceIDList: number[];




    constructor(salonID: number,
        visitDate: string,
        visitStartTime: string,
        visitStatus: string,
        employeeID: number,
        customerID: number,
        serviceIDList: number[]
    ) {
        this.salonID = salonID;
        this.visitDate = visitDate;
        this.visitStartTime = visitStartTime;
        this.visitStatus = visitStatus;
        this.employeeID = employeeID;
        this.customerID = customerID;
        this.serviceIDList = serviceIDList;
    }

}





