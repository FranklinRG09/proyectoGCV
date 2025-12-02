// src/app/guards/role.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, take, tap } from 'rxjs/operators';

export const authRoleGuard: (requiredRole: string) => CanActivateFn = (requiredRole: string) => {
  return (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.user$.pipe(
      take(1),
      map(user => {
        if (!user) return false;
        // roles stored namespaced as in tu ejemplo
        const rolesClaimKey = 'https://example.com/roles';
        const roles = (user as any)[rolesClaimKey] ?? (user as any).roles ?? [];
        const rolesLower = Array.isArray(roles) ? roles.map((r:any) => String(r).toLowerCase()) : [];
        return rolesLower.includes(requiredRole.toLowerCase());
      }),
      tap(hasRole => {
        if (!hasRole) {
          // si no tiene rol, puedes redirigir a inicio o página "no autorizado"
          router.navigate(['/inicio-sesion']);
        }
      })
    );
  };
};
