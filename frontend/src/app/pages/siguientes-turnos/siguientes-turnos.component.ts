import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-siguientes-turnos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule],
  templateUrl: './siguientes-turnos.component.html',
  styleUrls: ['./siguientes-turnos.component.scss']
})
export class SiguientesTurnosComponent implements OnInit, OnDestroy {

  siguientesTurnos: Turno[] = [];
  personasEsperando = 0;
  maxTurnos = 5;
  private sub!: Subscription;

  constructor(private turnosService: TurnosService) {}

  ngOnInit(): void {
    this.cargarTurnos();

    this.sub = this.turnosService.turnosActualizados$.subscribe(() => {
      this.cargarTurnos();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  cargarTurnos() {
    this.turnosService.obtenerTurnosPorEstado('EN_ESPERA').subscribe({
      next: (data) => {
        // Orden inverso → el último creado (mayor ID) primero
        const ordenados = data.sort((a, b) => a.id - b.id);
        this.siguientesTurnos = ordenados.slice(0, this.maxTurnos);
        this.personasEsperando = data.length;
      },
      error: (err) => console.error('Error al obtener siguientes turnos:', err)
    });
  }
}
