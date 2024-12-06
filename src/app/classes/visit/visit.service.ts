import { inject, Injectable, OnInit } from '@angular/core';
import { Visit } from './visit';
import { BarberService } from '../barber/barber.service';
import { SalonService } from '../Salon/salon.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap, tap } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { CustomerService } from '../customer/customer.service';
import { CustomerDTO } from '../customer/customerDTO';
import { Employee } from '../employee/employee';
import { visit } from '../../place/models/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {




  api_url = `http://localhost:8080/api/crud/visit`
  api_url_appointment = `http://localhost:8080/api/crud/appointment-making`


  // TODO to chyba niepotrzebne
  createTimeOnly(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, minutes, seconds, 0);
    return dateObj;
  }

  private visits: Visit[] = [];
  private customerMap: Map<number, CustomerDTO> = new Map();
  private employeeMap: Map<number, Employee> = new Map();



  constructor(private http: HttpClient, private employeeService: EmployeeService, private customerService: CustomerService) { }

  getVisits() {
    return this.visits;
  }

  getVisit(id: string) {
    return this.visits[0];
  }

  getCustomerMap(): Map<number, CustomerDTO> {
    return this.customerMap;
  }

  getEmployeeMap(): Map<number, Employee> {
    return this.employeeMap;
  }

  groupVisitsByDate(visits: Visit[]) {
    return visits.reduce((temp, visit) => {
      if (!temp[visit.visitDate]) {
        temp[visit.visitDate] = [];
      }
      temp[visit.visitDate].push(visit);
      return temp;
    }, {} as { [key: string]: Visit[] });
  }


  private getAllVisitsWithIdsByCustomerID(customerID: number): Observable<Visit[]> {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<Visit[]>(`${this.api_url}/withIds/forCustomer/${customerID}`)

  }


  initializeVisitsByCustomerID(customerID: number) {
    return this.getAllVisitsWithIdsByCustomerID(customerID).pipe(
      switchMap((visits) => {
        this.visits = this.sortVisits(visits);
        const distinctIDs = getDistinctIDs(visits);

        return this.employeeService.getAllEmployeesByListOfId(distinctIDs.distinctEmployeeIDs).pipe(
          tap((employees) => {
            this.employeeMap.clear();
            employees.forEach((employee) => {
              this.employeeMap.set(employee.employeeID, employee);
            });
          })
        );
      })
    );
  }

  private sortVisits(visits: Visit[]): any[] {

    return visits.sort((a, b) => {
      const dateA = new Date(`${a.visitDate}T${a.visitStartTime}`);
      const dateB = new Date(`${b.visitDate}T${b.visitStartTime}`);

      return dateA.getTime() - dateB.getTime();
    });
  }

  private getAllVisitsWithIdsByEmployeeID(employeeID: number): Observable<Visit[]> {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<Visit[]>(`${this.api_url}/withIds/forEmployee/${employeeID}`)

  }

  initializeVisitsByEmployeeID(employeeID: number) {
    return this.getAllVisitsWithIdsByEmployeeID(employeeID).pipe(
      switchMap((visits) => {
        this.visits = visits;
        const distinctIDs = getDistinctIDs(visits);

        // Fetch customers and store them in a Map
        return this.customerService.getAllCustomersByListOfId(distinctIDs.distinctCustomerIDs).pipe(
          tap((customers) => {
            this.customerMap.clear();
            customers.forEach((customer) => {
              this.customerMap.set(customer.customerID, customer); // Store customer by ID
            });
          })
        );
      })
    );
  }


  rescheduleVisit(visitID: number, time: string, date: string, userID: number, userRole: string) {
    const RescheduleDTO = {
      userID: userID,
      userRole: userRole,
      rescheduleDate: date,
      rescheduleTime: time
    }
    console.log(RescheduleDTO)
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.patch<boolean>(`${this.api_url_appointment}/reschedule-visit/${visitID}`, RescheduleDTO, httpOptions)

  }



  cancelVisitEmployee(visitID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http.patch<boolean>(`${this.api_url_appointment}/cancel-employee/${visitID}`, httpOptions)

  }

  cancelVisitCustomer(visitID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.patch<boolean>(`${this.api_url_appointment}/cancel-customer/${visitID}`, httpOptions)

  }



  getNumberOfFinishedVisitsByCustomerID(customerID: number) {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
    return this.http.get<number>(`${this.api_url}/doneForCustomer/${customerID}`, httpOptions)

  }


}


function getDistinctIDs(visits: { customerID: number; employeeID: number }[]): { distinctCustomerIDs: number[], distinctEmployeeIDs: number[] } {
  const customerIDs = new Set<number>();
  const employeeIDs = new Set<number>();

  for (const visit of visits) {
    customerIDs.add(visit.customerID);
    employeeIDs.add(visit.employeeID);
  }

  return {
    distinctCustomerIDs: Array.from(customerIDs),
    distinctEmployeeIDs: Array.from(employeeIDs)
  };
}





