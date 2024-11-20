export class EmployeeDTO {
  employeeID: number;
  employeeName: string;
  employeeSurname: string;
  employeeDialNumber: string;
  encryptedEmployeePassword: string;
  employeeEmail: string;
  employeeBirthdayDate: Date;
  employeeEmploymentDate: Date;
  employeeMonthlyPay: number;
  employeeCity: string;
  employeeStreet: string;
  employeeBuildingNumber: string;
  employeeApartmentNumber: string;
  employeePostalCode: string;

  constructor(
    employeeID: number,
    employeeName: string,
    employeeSurname: string,
    employeeDialNumber: string,
    encryptedEmployeePassword: string,
    employeeEmail: string,
    employeeBirthdayDate: Date,
    employeeEmploymentDate: Date,
    employeeMonthlyPay: number,
    employeeCity: string,
    employeeStreet: string,
    employeeBuildingNumber: string,
    employeeApartmentNumber: string,
    employeePostalCode: string
  ) {
    this.employeeID = employeeID;
    this.employeeName = employeeName;
    this.employeeSurname = employeeSurname;
    this.employeeDialNumber = employeeDialNumber;
    this.encryptedEmployeePassword = encryptedEmployeePassword;
    this.employeeEmail = employeeEmail;
    this.employeeBirthdayDate = employeeBirthdayDate;
    this.employeeEmploymentDate = employeeEmploymentDate;
    this.employeeMonthlyPay = employeeMonthlyPay;
    this.employeeCity = employeeCity;
    this.employeeStreet = employeeStreet;
    this.employeeBuildingNumber = employeeBuildingNumber;
    this.employeeApartmentNumber = employeeApartmentNumber;
    this.employeePostalCode = employeePostalCode;
  }
}
