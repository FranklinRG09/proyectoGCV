import { Component } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { VerTurnosComponent } from '../ver-turnos/ver-turnos.component';
import { SiguientesTurnosComponent } from '../siguientes-turnos/siguientes-turnos.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos',
  imports: [MatCardModule, VerTurnosComponent, SiguientesTurnosComponent, CommonModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.scss'
})
export class TurnosComponent {

}
