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

  constructor(private http: HttpClient, private router:Router
  ) {
    const isLoggedIn = this.isLoggedIn();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
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
      localStorage.setItem('authUser', 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('authUser');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

}
