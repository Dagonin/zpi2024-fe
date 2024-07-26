import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MapComponent } from './map/map.component';
import { authGuard } from './auth/auth.guard';
import { negateAuthGuard } from './auth/negate-auth.guard';

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
