import { Categoria } from './categoria.models';
import { PacientesDoctores as Persona } from './pacientes-doctores.models';

export interface ReservaDeTurno {
  id: number; // ID único de la reserva
  doctor: Persona; // Nombre del doctor
  paciente: Persona; // Nombre del paciente
  fecha: Date; // Fecha de la reserva
  hora: string; // Horario de la reserva (por ejemplo, "09:00 - 10:00")
  categoria: Categoria; //Descripcion de la categoria
}
