import { Routes } from '@angular/router';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './pages/turnos/turnos.component';

export const routes: Routes = [
    {path: 'solicitar-turno', component: SolicitarTurnoComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: 'turnos', component: TurnosComponent},
    {path: '', redirectTo: 'solicitar-turnos', pathMatch: 'full'}
];
