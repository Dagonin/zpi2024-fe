import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        provideHttpClient()
      ]
    });

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return correct role', () => {
    service.login({ login: 'admin', password: 'admin123' });
    expect(service.getRole()).toBe('admin');
   });

   it('should return correct login status', () => {
    service.logout();
    expect(service.isLoggedIn()).toBeFalse();
    service.login({ login: 'admin', password: 'admin123' });
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should logout correctly', () => {
    service.login({ login: 'admin', password: 'admin123' }); // Log in first
    service.logout();
    expect(localStorage.getItem('authUser')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();

    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalse();
    });

    service.userRole$.subscribe(role => {
      expect(role).toBe('');
    });

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

});
