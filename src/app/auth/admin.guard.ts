import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService  =  inject(AuthService);
  const router  =  inject(Router);


  if (authService.isLoggedIn() && authService.getRole() === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;

};
