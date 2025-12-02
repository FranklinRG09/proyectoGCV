import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-siguientes-turnos',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './siguientes-turnos.component.html',
})
export class SiguientesTurnosComponent implements OnInit, OnDestroy {

  siguientesTurnos: Turno[] = [];
  personasEsperando = 0;
  maxTurnos = 5;
  paginaActual = 1;
  turnosPorPagina = 5;
  private sub!: Subscription;

  constructor(private turnosService: TurnosService) {}

  ngOnInit(): void {
    this.cargarTurnos();
    this.sub = this.turnosService.turnosActualizados$.subscribe(() => this.cargarTurnos());
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  cargarTurnos() {
    this.turnosService.obtenerTurnosPorEstado('EN_ESPERA').subscribe({
      next: (data) => {
        const ordenados = data.sort((a, b) => a.id - b.id);
        this.siguientesTurnos = ordenados;
        this.personasEsperando = data.length;
      },
      error: (err) => console.error('Error al obtener siguientes turnos:', err)
    });
  }

  get turnosPaginados() {
    const inicio = (this.paginaActual - 1) * this.turnosPorPagina;
    return this.siguientesTurnos.slice(inicio, inicio + this.turnosPorPagina);
  }

  siguientePagina() {
    if (this.paginaActual * this.turnosPorPagina < this.siguientesTurnos.length) this.paginaActual++;
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }
}
