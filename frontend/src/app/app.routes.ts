import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { AyudaComponent } from './pages/ayuda/ayuda.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'servicios', component: ServiciosComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: '', redirectTo: 'inicio', pathMatch: 'full'}
];
