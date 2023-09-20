export interface ReservaDeTurnoFiltro {
  doctor: string; // Nombre del doctor
  paciente: string; // Nombre del paciente
  fechaDesde: string; // Fecha de la reserva
  fechaHasta: string; // Horario de la reserva (por ejemplo, "09:00 - 10:00")
}
