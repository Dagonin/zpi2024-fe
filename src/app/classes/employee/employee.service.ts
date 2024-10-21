import { Injectable } from '@angular/core';
import { EmployeeDTO } from './employeeDTO';  // Adjust the path if necessary

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  // This method returns an array of example EmployeeDTO objects
  getExampleEmployees(): EmployeeDTO[] {
    const employees: EmployeeDTO[] = [
      new EmployeeDTO(
        1,
        'John',
        'Doe',
        '123456789',
        'encryptedPassword123',
        'john.doe@example.com',
        new Date(1990, 5, 15), // Birthday: June 15, 1990
        new Date(2015, 3, 12), // Employment Date: April 12, 2015
        3000.0,
        'New York',
        'Main Street',
        '12',
        'A',
        '10001'
      ),
      new EmployeeDTO(
        2,
        'Jane',
        'Smith',
        '987654321',
        'encryptedPassword456',
        'jane.smith@example.com',
        new Date(1985, 10, 22), // Birthday: November 22, 1985
        new Date(2010, 7, 5),   // Employment Date: August 5, 2010
        3500.0,
        'Los Angeles',
        'Sunset Blvd',
        '45',
        '5B',
        '90001'
      ),
      new EmployeeDTO(
        3,
        'Emily',
        'Brown',
        '112233445',
        'encryptedPassword789',
        'emily.brown@example.com',
        new Date(1992, 2, 3),   // Birthday: March 3, 1992
        new Date(2018, 1, 20),  // Employment Date: February 20, 2018
        2800.0,
        'San Francisco',
        'Market Street',
        '100',
        '23C',
        '94103'
      ),
      new EmployeeDTO(
        4,
        'Michael',
        'Johnson',
        '556677889',
        'encryptedPassword012',
        'michael.johnson@example.com',
        new Date(1980, 7, 25),  // Birthday: August 25, 1980
        new Date(2005, 6, 15),  // Employment Date: July 15, 2005
        4500.0,
        'Chicago',
        'Michigan Avenue',
        '78',
        '12A',
        '60601'
      ),
      new EmployeeDTO(
        5,
        'Sarah',
        'Wilson',
        '223344556',
        'encryptedPassword345',
        'sarah.wilson@example.com',
        new Date(1995, 11, 10), // Birthday: December 10, 1995
        new Date(2020, 5, 25),  // Employment Date: June 25, 2020
        3200.0,
        'Seattle',
        'Pine Street',
        '55',
        '7B',
        '98101'
      )
    ];

    return employees;
  }
}
