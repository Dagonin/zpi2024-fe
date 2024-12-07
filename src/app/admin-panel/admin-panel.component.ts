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
  ) {
  }

  salonsMap: Map<number, Salon> = new Map();
  employeesMap: Map<number, Employee> = new Map();
  employeeQualificationsMap: Map<number, EmployeeQualification> = new Map();
  servicesMap: Map<number, ServiceDTO> = new Map();
  openingHoursMap: Map<number, OpeningHours[]> = new Map();
  serviceCategoryMap: Map<number, ServiceCategoryDTO> = new Map();
  assignmentsMap: Map<number, AssignmentToSalon[]> = new Map();


  displayedSalonColumns = ['salonName', 'salonDialNumber', 'salonCity', 'salonStreet', 'salonBuildingNumber', 'salonPostalCode'];
  displayedEmployeeColumns = ['employeeFullName', 'employeeDialNumber', 'employeeBirthday', 'employeeEmploymentDate', 'employeeMonthlyPay', 'employeeAddress'];
  salons!: MatTableDataSource<Salon>;
  employees!: MatTableDataSource<Employee>;

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

  @ViewChild(MatSort) sort!: MatSort;




}