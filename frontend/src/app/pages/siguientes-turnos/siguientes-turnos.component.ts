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

  // lista completa recibida del servicio (filtrada por estado)
  allSiguientesTurnos: Turno[] = [];

  personasEsperando = 0;

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
    this.turnosService.obtenerTurnosPorEstado('EN_ESPERA').subscribe({
      next: (data) => {
        // ordenar de menor a mayor id (cola)
        const ordenados = (data ?? []).sort((a, b) => a.id - b.id);
        this.allSiguientesTurnos = ordenados;
        this.personasEsperando = ordenados.length;

        // resetear paginación a página 1 y actualizar slice visible
        this.paginaActual = 1;
      },
      error: (err) => console.error('Error al obtener siguientes turnos:', err)
    });
  }

  // getter que devuelve el slice paginado que la plantilla iterará
  get turnosPaginados(): Turno[] {
    const inicio = (this.paginaActual - 1) * this.turnosPorPagina;
    return this.allSiguientesTurnos.slice(inicio, inicio + this.turnosPorPagina);
  }

  siguientePagina() {
    if (this.paginaActual * this.turnosPorPagina < this.allSiguientesTurnos.length) {
      this.paginaActual++;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  // Total de páginas para mostrar en el paginador
  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.allSiguientesTurnos.length / this.turnosPorPagina));
  }
}
