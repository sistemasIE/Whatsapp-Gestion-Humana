import type { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('user');

  // If the user is authenticated, allow access to the route
  if (isAuthenticated) {
    return true;
  }

  // If the user is not authenticated, redirect to the login page
  // window.location.href = '/login';
  return true;
};
