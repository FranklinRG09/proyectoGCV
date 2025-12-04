// historial-turnos.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';

@Component({
  selector: 'app-registro-turnos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule
  ],
  templateUrl: './registro-turnos.component.html'
})
export class RegistroTurnosComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['nombres', 'documento', 'motivo', 'horaAtencion', 'horaFin'];
  dataSource = new MatTableDataSource<Turno>([]);

  // lista completa (todos los finalizados)
  allTurnosFinalizados: Turno[] = [];
  // usado en la plantilla para chequear vacío
  turnosFinalizados: Turno[] = [];

  // paginación
  paginaActual = 1;
  turnosPorPagina = 10; // 10 en 10
  private sub!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private turnoService: TurnosService) {}

  ngOnInit(): void {
    this.cargarTurnos();
    this.sub = this.turnoService.turnosActualizados$?.subscribe(() => this.cargarTurnos());
  }

  ngAfterViewInit(): void {
    if (this.sort) this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  cargarTurnos(): void {
    this.turnoService.obtenerTodos().subscribe({
      next: (data) => {
        // filtrar solo FINALIZADO y ordenar (más recientes primero)
        const ordenados = (data ?? [])
          .filter(t => t.estado === 'FINALIZADO')
          .sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        this.allTurnosFinalizados = ordenados;
        // mantener variable que usa el template para la comprobación de vacío
        this.turnosFinalizados = this.allTurnosFinalizados;

        // resetear página a 1 y actualizar slice visible
        this.paginaActual = 1;
        this.actualizarPaginacion();
      },
      error: (err) => {
        console.error('Error al obtener turnos finalizados:', err);
        this.allTurnosFinalizados = [];
        this.turnosFinalizados = [];
        this.dataSource.data = [];
      }
    });
  }

  actualizarPaginacion(): void {
    const inicio = (this.paginaActual - 1) * this.turnosPorPagina;
    const slice = this.allTurnosFinalizados.slice(inicio, inicio + this.turnosPorPagina);
    this.dataSource.data = slice;
  }

  paginaAnterior(): void {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  siguientePagina(): void {
    if (this.paginaActual * this.turnosPorPagina < this.allTurnosFinalizados.length) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  get totalPaginas(): number {
    return Math.max(1, Math.ceil(this.allTurnosFinalizados.length / this.turnosPorPagina));
  }

  // Método utilitario para formatear hora si viene como string o Date
  formatoHora(fecha?: string | Date): string {
    if (!fecha) return '-';
    const d = typeof fecha === 'string' ? new Date(fecha) : fecha;
    if (!d || isNaN(d.getTime())) return '-';
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
