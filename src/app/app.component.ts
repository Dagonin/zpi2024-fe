import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {  MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MapComponent } from "./map/map.component";
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

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
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'inz';
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
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
