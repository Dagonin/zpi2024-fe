import { CustomerDTO } from "../customer/customerDTO";
import { Employee } from "../employee/employee";

export class VisitWithOBJ {
    salonID: number;
    visitDate: string;
    visitStartTime: string;
    visitStatus: string;
    employee: Employee;
    customer: CustomerDTO;
    visitID: number;



    constructor(salonID: number,
        visitDate: string,
        visitStartTime: string,
        visitStatus: string,
        employee: Employee,
        customer: CustomerDTO,
        visitID: number
    ) {
        this.salonID = salonID;
        this.visitDate = visitDate;
        this.visitStartTime = visitStartTime;
        this.visitStatus = visitStatus;
        this.employee = employee;
        this.customer = customer;
        this.visitID = visitID
    }

}
