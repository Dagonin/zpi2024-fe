import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { authGuard } from './auth/auth.guard';
import { negateAuthGuard } from './auth/negate-auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { adminGuard } from './auth/admin.guard';
import { PlaceComponent } from './place/place.component';
import { employeeGuard } from './auth/employee.guard';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [{
        path: 'login',
        canActivate:[negateAuthGuard],
        loadComponent:()=>
            import('./login/login.component').then((c)=>c.LoginComponent),
    },{
        path: 'register',
        canActivate:[negateAuthGuard],
        loadComponent:()=>
            import('./register/register.component').then((c)=>c.RegisterComponent),
    },{
        path: 'contact',
        loadComponent:()=>
            import('./contact/contact.component').then((c)=>c.ContactComponent),
    },{
        path: 'profile',
        canActivate: [authGuard],
        loadComponent:()=>
            import('./profile/profile.component').then((c)=>c.ProfileComponent),
    },{
        path: 'history',
        canActivate: [authGuard],
        loadComponent:()=>
            import('./history/history.component').then((c)=>c.HistoryComponent),
    },{
        path: 'place/:placeid',
        loadComponent:()=>
            import('./place/place.component').then((c)=>c.PlaceComponent),
    },{
        path: 'adm_panel',
        canActivate: [authGuard, employeeGuard],
        loadComponent:()=>
            import('./admin-panel/admin-panel.component').then((c)=>c.AdminPanelComponent),
    },{
        path: 'forgotten_password',
        loadComponent:()=>
            import('./forgotten-password/forgotten-password.component').then((c)=>c.ForgottenPasswordComponent),
    },{
        path: '',
        component: MainPageComponent
    },{
        path: '404',
        loadComponent:()=>
            import('./page-not-found/page-not-found.component').then((c)=>c.PageNotFoundComponent),
    },{
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
