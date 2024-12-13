import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { negateAuthGuard } from './auth/negate-auth.guard';
import { employeeGuard } from './auth/employee.guard';
import { MainPageComponent } from './main-page/main-page.component';
import { negateEmployeeGuard } from './auth/negate-employee.guard';

export const routes: Routes = [{
    path: 'login',
    canActivate: [negateAuthGuard],
    loadComponent: () =>
        import('./forms/login/login.component').then((c) => c.LoginComponent),
}, {
    path: 'register',
    canActivate: [negateAuthGuard],
    loadComponent: () =>
        import('./forms/register/register.component').then((c) => c.RegisterComponent),
}, {
    path: 'contact',
    loadComponent: () =>
        import('./contact/contact.component').then((c) => c.ContactComponent),
}, {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
        import('./profile/profile.component').then((c) => c.ProfileComponent),
}, {
    path: 'history',
    canActivate: [authGuard],
    loadComponent: () =>
        import('./history/history.component').then((c) => c.HistoryComponent),
}, {
    path: 'place/:salonid',
    canActivate: [authGuard],
    loadComponent: () =>
        import('./place/place.component').then((c) => c.PlaceComponent),
},
{
    path: 'place/:salonid/:flag',
    canActivate: [authGuard, employeeGuard],
    loadComponent: () =>
        import('./place/place.component').then((c) => c.PlaceComponent),
},
{
    path: 'emp_panel',
    canActivate: [authGuard, employeeGuard],
    loadComponent: () =>
        import('./employee-panel/employee-panel.component').then((c) => c.EmployeePanelComponent),
}, {
    path: 'adm_panel',
    canActivate: [authGuard, employeeGuard],
    loadComponent: () =>
        import('./admin-panel/admin-panel.component').then((c) => c.AdminPanelComponent),
}, {
    path: 'forgotten_password',
    loadComponent: () =>
        import('./forms/forgotten-password/forgotten-password.component').then((c) => c.ForgottenPasswordComponent),
}, {
    path: 'customer/:requestid',
    loadComponent: () =>
        import('./forms/change-password/change-password.component').then((c) => c.ChangePasswordComponent),
}, {
    path: '',
    component: MainPageComponent
}, {
    path: '404',
    loadComponent: () =>
        import('./page-not-found/page-not-found.component').then((c) => c.PageNotFoundComponent),
}, {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
}
];
