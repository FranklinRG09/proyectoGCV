import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

type MenuItem = {
  icon: string;
  label: string;
  route: string;
  requiredRole?: string;
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  private auth = inject(AuthService);

  private readonly rolesClaimKey = 'https://example.com/roles';

  private readonly ALL_MENU: MenuItem[] = [
    { icon: 'person_add', label: 'Solicitar turno', route: '/solicitar-turno', requiredRole: 'Cliente' },
    { icon: 'event_note', label: 'Ver turnos', route: '/turnos'},
    { icon: 'admin_panel_settings', label: 'Administración', route: '/admin-turnos', requiredRole: 'Empleado' },
    { icon: 'history', label: 'Registros', route: '/registros', requiredRole: 'Empleado' }
  ];

  // helper que extrae roles del user, devuelve arreglo en minúsculas
  private getRolesFromUser(user: any): string[] {
    if (!user) return [];
    // 1) Claim namespaced estilo Auth0
    const namespaced = user[this.rolesClaimKey];
    if (Array.isArray(namespaced)) return namespaced.map(r => String(r).toLowerCase());

    // buscar cualquier claim que termine en "roles"
    const roleKeys = Object.keys(user).filter(k => /roles$/i.test(k));
    for (const k of roleKeys) {
      const v = user[k];
      if (Array.isArray(v)) return v.map((r:any) => String(r).toLowerCase());
      if (typeof v === 'string') return [v.toLowerCase()];
    }

    return [];
  }

  // Observable con roles en minúsculas (vacío si no autenticado)
  userRoles$: Observable<string[]> = this.auth.user$.pipe(
    map(user => this.getRolesFromUser(user)),
    startWith([])
  );

  // Observable que indica si el usuario tiene rol "empleado"
  isEmpleado$ = this.userRoles$.pipe(
    map(roles => roles.includes('empleado')),
    startWith(false)
  );

  // menú filtrado según roles: si item.requiredRole no existe se muestra siempre,
  // si existe se compara (case-insensitive) con roles del usuario
  menuItems$: Observable<MenuItem[]> = this.userRoles$.pipe(
    map(roles => this.ALL_MENU.filter(item => {
      if (!item.requiredRole) return true;
      return roles.includes(item.requiredRole.toLowerCase());
    }))
  );

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
