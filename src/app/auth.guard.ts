import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // Use Angular's inject function to get instances of AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is logged in by verifying the 'isLoggedIn' cookie
  const isLoggedIn = authService.getCookie('isLoggedIn') === 'true';

  // Allow access if logged in, otherwise redirect to login page
  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['/login']); // Redirect to login page
    return false;
  }
};
