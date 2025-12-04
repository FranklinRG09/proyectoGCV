import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { combineLatest, of } from 'rxjs';
import { filter, take, switchMap, map, tap } from 'rxjs/operators';

export const authRoleGuard: (requiredRole: string) => CanActivateFn = (requiredRole: string) => {
  return (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const getRolesFromUser = (user: any): string[] => {
      if (!user) return [];
      // 1) claim namespaced (Auth0)
      const namespaced = user['https://example.com/roles'];
      if (Array.isArray(namespaced)) return namespaced.map((r: any) => String(r).toLowerCase());

      // 2) buscar cualquier claim que termine en "roles"
      const roleKeys = Object.keys(user || {}).filter(k => /roles$/i.test(k));
      for (const k of roleKeys) {
        const v = (user as any)[k];
        if (Array.isArray(v)) return v.map((r: any) => String(r).toLowerCase());
        if (typeof v === 'string') return [v.toLowerCase()];
      }

      // 3) fallback a user.roles
      const fallback = (user as any).roles;
      if (Array.isArray(fallback)) return fallback.map((r: any) => String(r).toLowerCase());
      if (typeof fallback === 'string') return [fallback.toLowerCase()];

      return [];
    };

    return combineLatest([auth.isLoading$, auth.isAuthenticated$]).pipe(
      // esperar a que SDK termine de inicializar
      filter(([isLoading]) => isLoading === false),
      take(1),
      switchMap(([_, isAuthenticated]) => {
        console.log('[authRoleGuard] isAuthenticated =', isAuthenticated);
        if (!isAuthenticated) {
          console.warn('[authRoleGuard] Usuario no autenticado -> redirigiendo a /inicio-sesion');
          router.navigate(['/inicio-sesion']);
          return of(false);
        }

        // ya autenticado, leer user y evaluar roles
        return auth.user$.pipe(
          take(1),
          map(user => {
            console.log('[authRoleGuard] user claims:', user);
            const roles = getRolesFromUser(user);
            console.log('[authRoleGuard] roles extraídos:', roles);
            return { user, roles };
          }),
          map(({ roles }) => {
            const has = roles.includes(requiredRole.toLowerCase());
            console.log(`[authRoleGuard] requiredRole='${requiredRole}', hasRole=${has}`);
            return has;
          }),
        );
      })
    );
  };
};