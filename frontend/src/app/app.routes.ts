import { Routes } from '@angular/router';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './pages/turnos/turnos.component';
import { AdminTurnosComponent } from './pages/admin-turnos/admin-turnos.component';
import { InicioSesionComponent } from './pages/inicio-sesion/inicio-sesion.component';
import { authGuard } from './guards/auth.guard';
import { authRoleGuard } from './guards/auth-role.guard';

export const routes: Routes = [
    {path: 'inicio-sesion', component: InicioSesionComponent},
    {path: 'solicitar-turno', component: SolicitarTurnoComponent, canActivate: [authGuard]},
    {path: 'servicios', component: ServiciosComponent, canActivate: [authGuard, authRoleGuard('cliente')]},
    {path: 'ayuda', component: AyudaComponent, canActivate: [authGuard]},
    {path: 'turnos', component: TurnosComponent, canActivate: [authGuard]},
    {path: 'admin-turnos', component: AdminTurnosComponent, canActivate: [authGuard, authRoleGuard('empleado')]},
    {path: '', redirectTo: 'inicio-sesion', pathMatch: 'full'},
    {path: '**', redirectTo: 'inicio-sesion', pathMatch: 'full'}
];
