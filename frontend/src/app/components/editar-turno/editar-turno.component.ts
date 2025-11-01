import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { TurnosService } from '../../services/turnos.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Turno } from '../../models/turno.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-turno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './editar-turno.component.html',
  styleUrls: ['./editar-turno.component.scss']
})
export class EditarTurnoComponent {
  documento: string = '';
  mensajeError: string = '';
  turno: Turno | null = null;
  buscando: boolean = false;
  exito: boolean = false;

  turnoForm: FormGroup<{ 
    nombres: FormControl<string | null>; 
    apellidos: FormControl<string | null>; 
    documento: FormControl<string | null>; 
    motivo: FormControl<string | null>; 
  }>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarTurnoComponent>,
    private turnosService: TurnosService
  ) {
    this.turnoForm = this.fb.group({
      nombres: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      documento: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}-\d{1}$/)
      ]),
      motivo: new FormControl('', Validators.required)
    });
  }

  buscarTurno(): void {
    if (!this.documento.trim()) {
      this.mensajeError = 'Ingrese un documento.';
      return;
    }

    this.buscando = true;
    this.turnosService.buscarPorDocumento(this.documento).subscribe({
      next: (t: Turno | null) => {
        this.buscando = false;
        if (t && t.estado === 'EN_ESPERA') {
          this.turno = t;
          this.turnoForm.setValue({
            nombres: t.nombres,
            apellidos: t.apellidos,
            documento: t.documento,
            motivo: t.motivo
          });
          this.mensajeError = '';
        } else {
          this.turno = null;
          this.mensajeError = 'No se encontró un turno con ese documento.';
        }
      },
      error: () => {
        this.buscando = false;
        this.turno = null;
        this.mensajeError = 'Error al buscar el turno';
      }
    });
  }

  actualizarTurno(): void {
    if (!this.turno) return;

    const turnoActualizado: Turno = {
      ...this.turno, // mantiene id, numeroTurno y estado
      nombres: this.turnoForm.value.nombres || '',
      apellidos: this.turnoForm.value.apellidos || '',
      documento: this.turnoForm.value.documento || '',
      motivo: this.turnoForm.value.motivo || ''
    };

    this.turnosService.editarPorDocumento(this.turno.documento, turnoActualizado).subscribe({
      next: () => {
        this.exito = true;
        this.turnosService.notificarCambio();
      },
      error: () => {
        this.exito = false;
        this.mensajeError = 'Error al actualizar el turno';
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
