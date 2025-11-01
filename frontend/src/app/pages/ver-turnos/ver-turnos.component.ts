import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
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
  turnosLlamados: Turno[] = [];
  maxTurnos = 6;
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
        const ordenados = data.sort((a, b) => b.id - a.id);
        this.turnosLlamados = ordenados.slice(0, this.maxTurnos);
      },
      error: (err) => console.error('Error al obtener turnos:', err)
    });
  }

  esUltimo(turno: Turno): boolean {
    return this.turnosLlamados.length > 0 && this.turnosLlamados[0].id === turno.id;
  }
}
