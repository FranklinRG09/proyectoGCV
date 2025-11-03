import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Turno } from '../models/turno.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TurnosService {

  private apiUrl = `${environment.apiUrl}/turnos`;

  private turnosActualizados = new BehaviorSubject<void>(undefined);
  turnosActualizados$ = this.turnosActualizados.asObservable();

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl);
  }

  obtenerTurnosPorEstado(estado: string): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}?estado=${estado}`);
  }

  crearTurno(turno: Turno): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno);
  }

  buscarPorDocumento(documento: string): Observable<Turno | null> {
      return this.http.get<Turno | null>(`${this.apiUrl}/buscar?documento=${documento}`);
  }

  editarPorDocumento(documento: string, data: Partial<Turno>): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/editar?documento=${documento}`, data);
  }

  cambiarEstado(documento: string, nuevoEstado: string): Observable<Turno> {
    return this.http.put<Turno>(
      `${this.apiUrl}/cambiar-estado?documento=${documento}&nuevoEstado=${nuevoEstado}`,
      {}
    );
  }

  eliminarTurno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  notificarCambio() {
    this.turnosActualizados.next();
  }
}
