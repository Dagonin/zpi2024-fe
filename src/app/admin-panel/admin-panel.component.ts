import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeModule } from '@angular/material/tree';
import { AuthService } from '../auth/auth.service';
import { Salon } from '../classes/Salon/salon';
import { SalonService } from '../classes/Salon/salon.service';
import { EmployeeService } from '../classes/employee/employee.service';
import { ServiceService } from '../classes/service/service.service';
import { forkJoin, switchMap } from 'rxjs';
import { Employee } from '../classes/employee/employee';
import { EmployeeQualificationService } from '../classes/employee-qualification/employe-qualification.service';
import { EmployeeQualification } from '../classes/employee-qualification/employee-qualification';
import { ServiceDTO } from '../classes/service/serviceDTO';
import { OpeningHours } from '../classes/Salon/opening-hours';
import { ServiceCategoryService } from '../classes/service/service-category.service';
import { ServiceCategoryDTO } from '../classes/service/service-categoryDTO';
import { AssignmentToSalonService } from '../classes/assignment-to-salon/assignment-to-salon.service';
import { AssignmentToSalon } from '../classes/assignment-to-salon/assigment-to-salon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTab } from '@angular/material/tabs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SalonDialogComponent } from '../dialogs/admin-panel-dialogs/salon-dialog/salon-dialog.component';
import { EmployeeDialogComponent } from '../dialogs/admin-panel-dialogs/employee-dialog/employee-dialog.component';
import { ServiceDialogComponent } from '../dialogs/admin-panel-dialogs/service-dialog/service-dialog.component';
import { ServiceCategoryDialogComponent } from '../dialogs/admin-panel-dialogs/service-category-dialog/service-category-dialog.component';
import { OpeningHoursDialogComponent } from '../dialogs/admin-panel-dialogs/opening-hours-dialog/opening-hours-dialog.component';
import { AssignmentDialogComponent } from '../dialogs/admin-panel-dialogs/assignment-dialog/assignment-dialog.component';
import { EmployeeQualificationDialogComponent } from '../dialogs/admin-panel-dialogs/employee-qualification-dialog/employee-qualification-dialog.component';
import { ConfirmDialogSerice } from '../dialogs/confirm-dialog/confirm-dialog.service';
import { DeleteItemService } from './delete-item.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {



  constructor(
    private salonService: SalonService,
    private employeeService: EmployeeService,
    private serviceService: ServiceService,
    private employeeQualificationService: EmployeeQualificationService,
    private serviceCategoryService: ServiceCategoryService,
    private assignmentService: AssignmentToSalonService,
    public dialog: MatDialog,
    public deleteItemService: DeleteItemService
  ) {
  }

  salonsMap: Map<number, Salon> = new Map();
  employeesMap: Map<number, Employee> = new Map();
  employeeQualificationsMap: Map<number, EmployeeQualification> = new Map();
  servicesMap: Map<number, ServiceDTO> = new Map();
  // openingHoursMap: Map<number, OpeningHours[]> = new Map();
  openingHoursMap: Map<number, OpeningHours> = new Map();
  serviceCategoryMap: Map<number, ServiceCategoryDTO> = new Map();
  // assignmentsMap: Map<number, AssignmentToSalon[]> = new Map();
  assignmentsMap: Map<number, AssignmentToSalon> = new Map();


  displayedSalonColumns = ['salonName', 'salonDialNumber', 'salonCity', 'salonStreet', 'salonBuildingNumber', 'salonPostalCode', 'CRUD'];
  displayedEmployeeColumns = ['employeeFullName', 'employeeDialNumber', 'employeeBirthday', 'employeeEmploymentDate', 'employeeMonthlyPay', 'employeeAddress', 'CRUD'];
  displayedServiceColumns = ['serviceName', 'serviceSpan', 'servicePrice', 'serviceDescription', 'serviceCategory', 'CRUD'];
  displayedCategoryColumns = ['categoryName', 'categoryDescription', 'CRUD'];
  displayedOpeningHoursColumns = ['weekday', 'openingHour', 'closingHour', 'salonName', 'CRUD'];
  displayedAssignmentColumns = ['salonName', 'employeeName', 'assignmentDate', 'CRUD'];
  displayedQualificationColumns = ['employeeName', 'serviceCategory', 'CRUD'];

  salons!: MatTableDataSource<Salon>;
  employees!: MatTableDataSource<Employee>;
  services!: MatTableDataSource<ServiceDTO>;
  categories!: MatTableDataSource<ServiceCategoryDTO>;
  openingHours!: MatTableDataSource<OpeningHours>;
  assignments!: MatTableDataSource<AssignmentToSalon>;
  qualifications!: MatTableDataSource<EmployeeQualification>;

  ngOnInit(): void {
    forkJoin({
      salons: this.salonService.initializeSalons(),
      employees: this.employeeService.initializeEmployees(),
      employeeQualifications: this.employeeQualificationService.initializeEmployeeQualifications(),
      services: this.serviceService.initializeServices(),
      openingHours: this.salonService.initializeOpeningHours(),
      serviceCategories: this.serviceCategoryService.initializeServiceCategories(),
      assignments: this.assignmentService.initializeAssignments()
    }).subscribe(({ salons, employees, employeeQualifications, services, openingHours, serviceCategories, assignments }) => {
      console.log(salons, employees, employeeQualifications, services, openingHours, serviceCategories, assignments)

      this.salons = new MatTableDataSource(salons);
      this.employees = new MatTableDataSource(employees);
      this.services = new MatTableDataSource(services);
      this.categories = new MatTableDataSource(serviceCategories);
      this.openingHours = new MatTableDataSource(openingHours);
      this.assignments = new MatTableDataSource(assignments);
      this.qualifications = new MatTableDataSource(employeeQualifications);


      this.salons.sort = this.salonSort;
      this.employees.sort = this.employeeSort;
      this.services.sort = this.serviceSort;
      this.categories.sort = this.categorySort;
      this.openingHours.sort = this.openingHourSort;
      this.assignments.sort = this.assignmentSort;
      this.qualifications.sort = this.qualificationSort;

      this.salonsMap = this.salonService.getSalonMap();
      this.employeesMap = this.employeeService.getEmployeesMap();
      this.employeeQualificationsMap = this.employeeQualificationService.getEmployeeQualificationsMap();
      this.servicesMap = this.serviceService.getServiceMap();
      this.openingHoursMap = this.salonService.getOpeningHoursMap();
      this.serviceCategoryMap = this.serviceCategoryService.getServiceCategoryMap();
      this.assignmentsMap = this.assignmentService.getAssignmentsMap();

      // console.log(this.salonsMap, this.employeesMap, this.employeeQualificationsMap, this.servicesMap, this.openingHoursMap, this.serviceCategoryMap, this.assignmentsMap)

    })

  }

  @ViewChild('salonSort') salonSort!: MatSort;
  @ViewChild('employeeSort') employeeSort!: MatSort;
  @ViewChild('serviceSort') serviceSort!: MatSort;
  @ViewChild('categorySort') categorySort!: MatSort;
  @ViewChild('openingHourSort') openingHourSort!: MatSort;
  @ViewChild('assignmentSort') assignmentSort!: MatSort;
  @ViewChild('qualificationSort') qualificationSort!: MatSort;


  openSalonDialog(isEdit: boolean, salonID?: number) {
    let salon;
    if (salonID) {
      salon = this.salonsMap.get(salonID);
    }
    const dialogRef = this.dialog.open(SalonDialogComponent, {
      width: '500px',
      height: '600px',
      data: {
        isEdit: isEdit,
        salon: salon
      }
    });
  }

  openEmployeeDialog(isEdit: boolean, employeeID?: number) {
    let employee;
    if (employeeID) {
      employee = this.employeesMap.get(employeeID);
    }
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      height: '900px',
      data: {
        isEdit: isEdit,
        employee: employee
      }
    });
  }

  openServiceDialog(isEdit: boolean, serviceID?: number) {
    let service;
    if (serviceID) {
      service = this.servicesMap.get(serviceID);
    }
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        isEdit: isEdit,
        service: service,
        categories: this.categories.filteredData
      }
    });
  }

  openServiceCategoryDialog(isEdit: boolean, categoryID?: number) {
    let category;
    if (categoryID) {
      category = this.serviceCategoryMap.get(categoryID);
    }
    const dialogRef = this.dialog.open(ServiceCategoryDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        isEdit: isEdit,
        category: category,
      }
    });
  }

  openOpeningHoursDialog(isEdit: boolean, OpeningHoursID?: number) {
    let openingHours;
    if (OpeningHoursID) {
      openingHours = this.openingHoursMap.get(OpeningHoursID);
    }
    const dialogRef = this.dialog.open(OpeningHoursDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        isEdit: isEdit,
        openingHours: openingHours,
        salons: this.salons.filteredData
      }
    });
  }

  openAssignmentDialog(isEdit: boolean, assignmentID?: number) {
    let assignment;
    if (assignmentID) {
      assignment = this.assignmentsMap.get(assignmentID);
    }
    console.log(this.assignmentsMap)
    const dialogRef = this.dialog.open(AssignmentDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        isEdit: isEdit,
        assignment: assignment,
        salons: this.salons.filteredData,
        employees: this.employees.filteredData
      }
    });
  }

  openQualificationDialog(isEdit: boolean, qualificationID?: number) {
    let qualification;
    if (qualificationID) {
      qualification = this.employeeQualificationsMap.get(qualificationID);
    }
    const dialogRef = this.dialog.open(EmployeeQualificationDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        isEdit: isEdit,
        qualification: qualification,
        categories: this.categories.filteredData,
        employees: this.employees.filteredData
      }
    });
  }





}