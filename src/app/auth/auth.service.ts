import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUrl = 'http://localhost:3000/api';

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  private userRoleSubject: BehaviorSubject<string>;
  public userRole$: Observable<string>;

  constructor(private http: HttpClient, private router:Router
  ) {
    const isLoggedIn = this.isLoggedIn();
    const getRole = this.getRole();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string>(getRole);
    this.userRole$ = this.userRoleSubject.asObservable();
   }


  signup(data: any) {
    // return this.httpClient.post(`${this.baseUrl}/register`, data);
    return true;
  }

  login(data: any) {
    // return this.httpClient.post(`${this.baseUrl}/login`, data)
    //   .pipe(tap((result) => {
    //     localStorage.setItem('authUser', JSON.stringify(result));
    //   }));

    if(data.login === "admin" && data.password === "admin123"){
      localStorage.setItem('authUser', data.login);
      localStorage.setItem('role', 'admin');
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next('admin');
      return true;
    }
    
    if(data.login === "user1" && data.password === "useruser"){
      localStorage.setItem('authUser', data.login);
      localStorage.setItem('role', 'user');
      this.isAuthenticatedSubject.next(true);
      this.userRoleSubject.next('user');
      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('authUser');
    localStorage.removeItem('role');
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('');
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getRole() : string{
    return localStorage.getItem('role') as string
  }

}
