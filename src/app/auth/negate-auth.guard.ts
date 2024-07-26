import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const negateAuthGuard: CanActivateFn = (route, state) => {

  const authService  =  inject(AuthService);
  const router  =  inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/']);
    return false;
  }
  return true;

};
