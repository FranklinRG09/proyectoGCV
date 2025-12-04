import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../models/turno.model';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-turnos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './admin-turnos.component.html'
})
export class AdminTurnosComponent implements OnInit, OnDestroy {

  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  turnosPaginados: Turno[] = [];

  estados: string[] = ['EN_ESPERA', 'EN_LLAMADA', 'EN_PROCESO', 'AUSENTE', 'FINALIZADO'];
  motivosDisponibles: string[] = ['CAJA', 'CONSULTORIA', 'DESPACHO', 'ENTREGA'];

  filtroMotivo: string = '';
  filtroEstado: string = '';

  // Paginación personalizada
  paginaActual = 0;
  turnosPorPagina = 4;
  totalPaginas = 0;

  private sub!: Subscription;

  constructor(private turnoService: TurnosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cargarTurnos();

    this.sub = this.turnoService.turnosActualizados$.subscribe(() => {
      this.cargarTurnos();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  // Carga los turnos desde el servicio
  cargarTurnos(): void {
    this.turnoService.obtenerTodos().subscribe({
      next: (data) => {
        this.turnos = data.map(t => ({ ...t, estadoSeleccionado: t.estado }));
        this.aplicarFiltro();
      },
      error: (err) => console.error('Error al obtener turnos:', err)
    });
  }

  // Aplica filtros por motivo y estado
  aplicarFiltro(): void {
    this.turnosFiltrados = this.turnos.filter(t => {
      const cumpleMotivo = this.filtroMotivo ? t.motivo === this.filtroMotivo : true;
      const cumpleEstado = this.filtroEstado ? t.estado === this.filtroEstado : true;
      return cumpleMotivo && cumpleEstado;
    });

    this.paginaActual = 0;
    this.actualizarPaginacion();
  }

  // Actualiza los turnos visibles según la página
  actualizarPaginacion(): void {
    const inicio = this.paginaActual * this.turnosPorPagina;
    this.turnosPaginados = this.turnosFiltrados.slice(inicio, inicio + this.turnosPorPagina);
    this.totalPaginas = Math.ceil(this.turnosFiltrados.length / this.turnosPorPagina);
  }

  // Navegar a la página anterior
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  // Navegar a la página siguiente
  siguientePagina(): void {
    if (this.paginaActual + 1 < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  // Selecciona un estado temporal para un turno
  seleccionarEstado(turno: Turno, estado: string): void {
    turno.estadoSeleccionado = estado;
  }

  // Cambia el estado de un turno y actualiza la vista
  cambiarEstado(turno: Turno): void {
    if (!turno.estadoSeleccionado || turno.estadoSeleccionado === turno.estado) return;

    this.turnoService.cambiarEstado(turno.documento, turno.estadoSeleccionado)
      .subscribe({
        next: updated => {
          // Actualizar propiedades del turno localmente
          turno.estado = updated.estado;
          turno.horaAtencion = updated.horaAtencion;
          turno.horaFin = updated.horaFin;

          // Si el turno fue finalizado, eliminarlo del array principal
          if (updated.estado === 'FINALIZADO') {
            this.turnos = this.turnos.filter(t => t.documento !== turno.documento);
          }

          // Reaplicar filtros y paginación para que la vista se actualice correctamente
          this.aplicarFiltro();

          // Ajustar página actual si quedó fuera de rango (p. ej. eliminaste el último elemento de la última página)
          if (this.paginaActual >= this.totalPaginas && this.totalPaginas > 0) {
            this.paginaActual = Math.max(0, this.totalPaginas - 1);
            this.actualizarPaginacion();
          }

          this.snackBar.open(
            `Estado de ${turno.nombres} actualizado a ${updated.estado}`,
            'Cerrar',
            { duration: 3000, panelClass: ['snackbar-success'] }
          );
        },
        error: err => {
          console.error('Error al actualizar turno', err);
          this.snackBar.open(
            `Error al actualizar turno de ${turno.nombres}`,
            'Cerrar',
            { duration: 3000, panelClass: ['snackbar-error'] }
          );
        }
      });
  }
  
    // Formatea estados legibles
  formatoEstado(estado?: string): string {
    if (!estado) return '';
    switch (estado) {
      case 'EN_ESPERA': return 'EN ESPERA';
      case 'EN_LLAMADA': return 'EN LLAMADA';
      case 'EN_PROCESO': return 'EN PROCESO';
      default: return estado;
    }
  }

}
