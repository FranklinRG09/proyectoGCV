import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { VerTurnosComponent } from '../ver-turnos/ver-turnos.component';
import { SolicitarTurnoComponent } from '../solicitar-turno/solicitar-turno.component';
import { SiguientesTurnosComponent } from '../siguientes-turnos/siguientes-turnos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule, VerTurnosComponent, SolicitarTurnoComponent, SiguientesTurnosComponent, CommonModule,],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
