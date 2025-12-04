import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ver-turnos',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './ver-turnos.component.html'
})
export class VerTurnosComponent implements OnInit, OnDestroy {
  // lista completa recibida del servicio (filtrada por estado)
  allTurnosLlamados: Turno[] = [];

  turnosLlamados: Turno[] = [];

  // paginación
  paginaActual = 1;
  turnosPorPagina = 6;

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
    this.turnosService.obtenerTurnosPorEstado('EN_LLAMADA').subscribe({
      next: (data) => {
        // ordenar de mayor a menor id (el más reciente al inicio)
        const ordenados = data.sort((a, b) => b.id - a.id);
        this.allTurnosLlamados = ordenados;
        // resetear a página 1 y calcular página actual
        this.paginaActual = 1;
        this.actualizarPaginacion();
      },
      error: (err) => console.error('Error al obtener turnos:', err)
    });
  }

  // calcula los turnos que se muestran en la página actual
  actualizarPaginacion(): void {
    const inicio = (this.paginaActual - 1) * this.turnosPorPagina;
    this.turnosLlamados = this.allTurnosLlamados.slice(inicio, inicio + this.turnosPorPagina);
  }

  siguientePagina(): void {
    if (this.paginaActual * this.turnosPorPagina < this.allTurnosLlamados.length) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  esUltimo(turno: Turno): boolean {
    return this.turnosLlamados.length > 0 && this.turnosLlamados[0].id === turno.id;
  }
}
