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

export const routes: Routes = [{
        path: 'login',
        canActivate:[negateAuthGuard],
        component: LoginComponent
    },{
        path: 'register',
        canActivate:[negateAuthGuard],
        component: RegisterComponent
    },{
        path: 'contact',
        component: ContactComponent
    },{
        path: 'profile',
        canActivate: [authGuard],
        component: ProfileComponent
    },{
        path: 'history',
        canActivate: [authGuard],
        component: HistoryComponent,
    },{
        path: 'place/:placeid',
        component: PlaceComponent,
    },{
        path: 'adm_panel',
        canActivate: [authGuard, adminGuard],
        component: AdminPanelComponent,
    },{
        path: '',
        component: MapComponent
    },{
        path: '404',
        component: PageNotFoundComponent
    },{
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
