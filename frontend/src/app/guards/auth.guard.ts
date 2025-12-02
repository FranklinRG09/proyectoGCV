import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';  

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/inicio-sesion']);
      }
    }),
    map(isAuthenticated => isAuthenticated)
  )
};
