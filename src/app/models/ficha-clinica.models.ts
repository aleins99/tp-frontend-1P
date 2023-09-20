import { Categoria } from './categoria.models';
import { ReservaDeTurno } from './reserva-turnos.models';
import { PacientesDoctores as Persona } from './pacientes-doctores.models';

export interface FichaClinica {
  id: number;
  paciente: Persona;
  doctor: Persona;
  motivoConsulta: string;
  diagnostico: string;
  fecha: Date;
  reserva: ReservaDeTurno;
  categoria: Categoria;
}
