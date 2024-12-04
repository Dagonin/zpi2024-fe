import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { RSAHelper } from './rsa-helper';
import { LoginDTO } from '../classes/login/loginDTO';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  private userRoleSubject: BehaviorSubject<string>;
  public userRole$: Observable<string>;
  private rsa_helper: RSAHelper;

  constructor(private http: HttpClient, private router: Router
  ) {
    const isLoggedIn = this.isLoggedIn();
    const getRole = this.getRole();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isLoggedIn);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
    this.userRoleSubject = new BehaviorSubject<string>(getRole);
    this.userRole$ = this.userRoleSubject.asObservable();
    this.rsa_helper = new RSAHelper();
  }

  api_url = `http://localhost:8080/api/auth`

  // login(data: any) {
  //   // console.log(data)
  //   // console.log(this.rsa_helper.encryptWithPublicKey(data.password))

  //   // return this.httpClient.post(`${this.baseUrl}/login`, data)
  //   //   .pipe(tap((result) => {
  //   //     localStorage.setItem('authUser', JSON.stringify(result));
  //   //   }));

  //   if(data.login === "admin" && data.password === "admin123"){
  //     localStorage.setItem('authUser', data.login);
  //     localStorage.setItem('role', 'admin');
  //     this.isAuthenticatedSubject.next(true);
  //     this.userRoleSubject.next('admin');
  //     return true;
  //   }

  //   if(data.login === "employee" && data.password === "employee"){
  //     localStorage.setItem('authUser', data.login);
  //     localStorage.setItem('role', 'employee');
  //     this.isAuthenticatedSubject.next(true);
  //     this.userRoleSubject.next('employee');
  //     return true;
  //   }

  //   if(data.login === "user1" && data.password === "useruser"){
  //     localStorage.setItem('authUser', data.login);
  //     localStorage.setItem('role', 'user');
  //     this.isAuthenticatedSubject.next(true);
  //     this.userRoleSubject.next('user');
  //     return true;
  //   }

  //   return false;
  // }

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




  // TODO
  private getCustomerID() {
    const httpOptions =
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }
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

  getRole(): string {
    return localStorage.getItem('role') as string
  }


  private decodeJWT(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid JWT Token:', error);
      return null;
    }
  }

}
