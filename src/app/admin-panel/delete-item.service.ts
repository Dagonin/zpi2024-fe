import { inject, Injectable } from "@angular/core";
import { ConfirmDialogSerice } from "../dialogs/confirm-dialog/confirm-dialog.service";
import { SalonService } from "../classes/Salon/salon.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EmployeeService } from "../classes/employee/employee.service";
import { EmployeeQualificationService } from "../classes/employee-qualification/employe-qualification.service";
import { ServiceService } from "../classes/service/service.service";
import { ServiceCategoryService } from "../classes/service/service-category.service";
import { AssignmentToSalonService } from "../classes/assignment-to-salon/assignment-to-salon.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteItemService {

    constructor(
        private confirmDialogService: ConfirmDialogSerice,
        private salonService: SalonService,
        private employeeService: EmployeeService,
        private employeeQualificationService: EmployeeQualificationService,
        private serviceService: ServiceService,
        private serviceCategoryService: ServiceCategoryService,
        private assignmentService: AssignmentToSalonService
    ) {

    }
    private _snackBar = inject(MatSnackBar);

    openSnackBar(text: string) {
        this._snackBar.open(text, "", {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: ['error_snack']
        });

    }


    deleteSalon(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń salon',
                message: `Czy jesteś pewny, że chcesz usunać ten salon?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.salonService.deleteSalon(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting salon:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('Salon deletion aborted');
                }
            });
    }

    deleteEmployee(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń pracownika',
                message: `Czy jesteś pewny, że chcesz usunać tego pracownika?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.employeeService.deleteEmployee(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting employee:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('Employee deletion aborted');
                }
            });
    }

    deleteService(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń usługe',
                message: `Czy jesteś pewny, że chcesz usunać tą usługe?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.serviceService.deleteService(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting service:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('Service deletion aborted');
                }
            });
    }

    deleteServiceCategory(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń kategorie usług',
                message: `Czy jesteś pewny, że chcesz usunać tą kategorie usług?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.serviceCategoryService.deleteServiceCategory(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting service category:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('Service category deletion aborted');
                }
            });
    }

    deleteEmployeeQualifiaction(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń kwalifikacje pracownika',
                message: `Czy jesteś pewny, że chcesz usunać tą kwalifikacje pracownika?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.employeeQualificationService.deleteEmployeeQualification(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting employee qualification:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('employee qualification deletion aborted');
                }
            });
    }

    deleteOpeningHours(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń godziny otwarcia',
                message: `Czy jesteś pewny, że chcesz usunać te godziny otwarcia?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.salonService.deleteOpeningHours(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting opening hours:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('opening hours deletion aborted');
                }
            });
    }

    deleteassignment(ID: number) {
        this.confirmDialogService
            .confirm({
                title: 'Usuń przydział pracownika',
                message: `Czy jesteś pewny, że chcesz usunać ten przydział pracownika do salonu?`,
                confirmText: 'Tak',
                cancelText: 'Nie',
            })
            .subscribe((confirmed) => {
                if (confirmed) {
                    this.assignmentService.deleteAssignmentToSalon(ID).subscribe({
                        next: (response) => {
                            window.location.reload();
                        },
                        error: (error) => {
                            console.log('Error deleting assignment:', error);
                            this.openSnackBar("Coś poszło nie tak, odśwież stronę")
                        },
                    });
                } else {
                    console.log('assignment deletion aborted');
                }
            });
    }

}