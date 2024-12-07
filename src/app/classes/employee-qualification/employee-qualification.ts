export class EmployeeQualification {
    employeeQualificationID: number;
    serviceCategoryID: number;
    employeeID: number;

    constructor(
        employeeQualificationID: number,
        serviceCategoryID: number,
        employeeID: number
    ) {
        this.employeeQualificationID = employeeQualificationID;
        this.serviceCategoryID = serviceCategoryID;
        this.employeeID = employeeID;
    }
}