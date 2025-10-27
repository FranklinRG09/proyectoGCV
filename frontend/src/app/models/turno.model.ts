/**
 * Interfaz que representa la estructura de un Turno.
 * Define los campos que se envían y reciben desde el backend.
 */
export interface Turno {
  id: any;
  numeroTurno: any;
  nombres: string;
  apellidos: string;
  documento: string;
  motivo: string;
  estado: string;
}
