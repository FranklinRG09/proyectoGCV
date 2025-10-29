import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';
import { MatCard, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-buscar-turno',
  templateUrl: './buscar-turno.component.html',
  styleUrls: ['./buscar-turno.component.scss'],
  imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatLabel, CommonModule, FormsModule, MatInputModule, MatButtonModule]
})
export class BuscarTurnoComponent {
  documento: string = '';
  mensajeError: string = '';
  turno: Turno | null = null;
  buscando: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<BuscarTurnoComponent>,
    private turnosService: TurnosService
  ) {}

  buscarTurno(): void {
    if (!this.documento.trim()) {
      this.mensajeError = 'Por favor ingrese un documento.';
      this.turno = null;
      return;
    }

    this.mensajeError = '';
    this.buscando = true;

    this.turnosService.buscarPorDocumento(this.documento).subscribe({
      next: (t: Turno | null) => {
        this.buscando = false;
        if (t && t.estado === 'EN_ESPERA') {
          this.turno = t;
          this.mensajeError = '';
        } else {
          this.turno = null;
          this.mensajeError = 'No se encontró un turno con ese documento.';
        }
      },
      error: () => {
        this.buscando = false;
        this.turno = null;
        this.mensajeError = 'Error al buscar el turno.';
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
