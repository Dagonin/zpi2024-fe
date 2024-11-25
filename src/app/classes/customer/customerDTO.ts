export class CustomerDTO {
    customerID: number;
    customerName: string;
    customerSurname: string;
    customerDialNumber: string;
    encryptedCustomerPassword: string;
    customerEmail: string;
    serviceCategoryID: number | null;

    constructor(
        customerID: number,
        customerName: string,
        customerSurname: string,
        customerDialNumber: string,
        encryptedCustomerPassword: string,
        customerEmail: string,
        serviceCategoryID: number | null
    ) {
        this.customerID = customerID;
        this.customerName = customerName;
        this.customerSurname = customerSurname;
        this.customerDialNumber = customerDialNumber;
        this.encryptedCustomerPassword = encryptedCustomerPassword;
        this.customerEmail = customerEmail;
        this.serviceCategoryID = serviceCategoryID;
    }
}
