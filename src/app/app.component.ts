import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MapComponent } from "./map/map.component";
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from './dialogs/user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    RouterLink,
    MapComponent,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public title = 'inz';
  public authService = inject(AuthService);
  public isAuthenticated$ = this.authService.isAuthenticated$;

  public userRole: string = '';
  public username: string | null = '';
  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.userRole = this.authService.getRole();

    // console.log(this.userRole)

    this.roleSubscription = this.authService.userRole$.subscribe(
      (userRole) => {
        this.userRole = userRole;
        this.username = localStorage.getItem('authUser');
        console.log(userRole)
      }
    );
  }




  readonly dialog = inject(MatDialog);

  openProfileDialog() {
    this.dialog.open(UserProfileDialogComponent, {
      height: '450px',
      width: '400px'
    })
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
