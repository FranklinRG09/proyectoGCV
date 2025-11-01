import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TurnosService } from '../../services/turnos.service';
import { ConfirmacionTurnoComponent } from '../../components/confirmacion-turno/confirmacion-turno.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BuscarTurnoComponent } from '../../components/buscar-turno/buscar-turno.component';
import { EditarTurnoComponent } from '../../components/editar-turno/editar-turno.component';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  turnoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private turnosService: TurnosService,
    private dialog: MatDialog
  ) {
    this.turnoForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(40)]],
      apellidos: ['', [Validators.required, Validators.maxLength(40)]],
      documento: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{8}-\d{1}$/) // Formato DUI salvadoreño
        ]
      ],
      motivo: ['', Validators.required]
    });
  }

  solicitarTurno() {
    if (this.turnoForm.valid) {
      const nuevoTurno = this.turnoForm.value;

      this.turnosService.crearTurno(nuevoTurno).subscribe({
        next: (respuesta) => {
          this.dialog.open(ConfirmacionTurnoComponent, {
            width: '400px',
            data: { turno: respuesta }
          });
          this.turnoForm.reset();
          this.turnosService.notificarCambio();
        },
        error: (err) => console.error('Error al crear turno:', err)
      });
    } else {
      this.turnoForm.markAllAsTouched();
    }
  }

  buscarTurno() {
    this.dialog.open(BuscarTurnoComponent, { width: '460px' });
  }

  editarTurno() {
    this.dialog.open(EditarTurnoComponent, { width: '500px' });
  }
}
