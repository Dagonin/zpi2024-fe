import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RSAHelper } from './rsa-helper';
import { LoginDTO } from '../classes/login/loginDTO';
import { jwtDecode } from "jwt-decode";
import { CustomerService } from '../classes/customer/customer.service';
import { CustomerDTO } from '../classes/customer/customerDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  private userRoleSubject: BehaviorSubject<string>;
  public userRole$: Observable<string>;

  constructor(private http: HttpClient, private router: Router, private customerService: CustomerService
  ) {
    const isLoggedIn = this.isLoggedIn();
    const getRole = this.getRole();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string>(getRole);
    this.userRole$ = this.userRoleSubject.asObservable();
    if (isLoggedIn && this.isTokenExpired(this.getAuthToken())) {
      this.logoutOnExpiredToken();
    }
  }

  api_url = `http://localhost:8080/api/auth`

  login(email: string, password: string): Observable<any> {

    const newLogin: LoginDTO = {
      email: email,
      password: password
    }
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

    }

    return this.http.post(`${this.api_url}/customer/login`, newLogin, httpOptions)
      .pipe(
        tap((response: any) => {
          if (response && response.tokenValue) {

            localStorage.setItem('token', response.tokenValue);
            localStorage.setItem('authUser', email);
            localStorage.setItem('role', 'C');
            localStorage.setItem('userID', this.decodeJWT(response.tokenValue).userId)

            this.isAuthenticatedSubject.next(true);
            this.userRoleSubject.next('user');
            this.router.navigate(['']);
          }
        })
      );
  }


  employeeLogin(email: string, password: string): Observable<any> {
    const newLogin: LoginDTO = {
      email: email,
      password: password
    }
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

    }

    return this.http.post(`${this.api_url}/employee/login`, newLogin, httpOptions)
      .pipe(
        tap((response: any) => {
          if (response && response.tokenValue) {

            localStorage.setItem('token', response.tokenValue);
            localStorage.setItem('authUser', email);
            localStorage.setItem('role', 'E');
            localStorage.setItem('userID', this.decodeJWT(response.tokenValue).userId)

            this.isAuthenticatedSubject.next(true);
            this.userRoleSubject.next('user');
            this.router.navigate(['']);
          }
        })
      );
  }

  getAuthToken() {
    return localStorage.getItem('token')
  }



  logout(): void {
    localStorage.removeItem('authUser');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userID');
    this.isAuthenticatedSubject.next(false);
    this.userRoleSubject.next('');
    this.router.navigate(['login']);
  }
  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }

  getRole(): string {
    return localStorage.getItem('role') as string
  }


  isTokenExpired(token: string | null): boolean {
    if (!token) return true;
    try {
      const decodedToken: any = this.decodeJWT(token);
      if (!decodedToken || !decodedToken.exp) {
        return true;
      }
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate <= new Date();
    } catch (error) {
      console.error('Token decoding error:', error);
      return true;
    }
  }

  logoutOnExpiredToken(): void {
    console.warn('JWT token has expired. Logging out...');
    this.logout();
  }

  private decodeJWT(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }

  getUserID(): number {
    const userID = localStorage.getItem("userID");
    if (userID) {
      return parseInt(userID);
    }
    return 0;
  }

  getUser() {
    const userEmail = localStorage.getItem("authUser");
    return this.customerService.getCustomerByEmail(userEmail!);
  }

}
