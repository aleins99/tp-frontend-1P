import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReservaDeTurno } from '../models/reserva-turnos.models';
import { ReservaDeTurnoFiltro } from './reserva-turnos-filtro.interface';
import { Categoria } from '../models/categoria.models';

export type ReservaDeTurnoFormateada = {
  fecha: string;
  id: number;
  doctor: string;
  paciente: string;
  hora: string;
  categoria: Categoria;
};

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  reservas: ReservaDeTurno[];

  constructor() {
    const reservasFromLocalStorage = localStorage.getItem('reservas');
    if (reservasFromLocalStorage) {
      this.reservas = JSON.parse(reservasFromLocalStorage);
    } else {
      this.reservas = []; // Inicializar como vacío si no hay datos en localStorage
    }
    console.log(this.reservas);
  }

  formattedDate(date: Date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0
    let yyyy = date.getFullYear();
    console.log(date.getDate());

    return yyyy + '/' + mm + '/' + dd;
  }

  // Get a list of reservations based on filters
  getReservas(
    filtros: ReservaDeTurnoFiltro
  ): Observable<ReservaDeTurnoFormateada[]> {
    // Simulate filtering based on filters if needed
    // Simulate filtering based on filters if needed
    let filteredReservas = this.reservas;
    console.log(filteredReservas);
    if (filtros.doctor) {
      filteredReservas = filteredReservas.filter((reserva) =>
        reserva.doctor.nombre
          .toLowerCase()
          .concat(' ', reserva.doctor.apellido.toLowerCase())
          .includes(filtros.doctor.toLowerCase())
      );
    }

    if (filtros.paciente) {
      filteredReservas = filteredReservas.filter((reserva) =>
        reserva.paciente.nombre
          .toLowerCase()
          .concat(' ', reserva.paciente.apellido.toLowerCase())
          .includes(filtros.paciente.toLowerCase())
      );
    }

    if (filtros.fechaDesde) {
      console.log('holaa');
      console.log(new Date(filtros.fechaDesde));
      console.log(new Date(filtros.fechaDesde.replace(/-/g, '/')));

      filteredReservas = filteredReservas.filter(
        (reserva) =>
          new Date(reserva.fecha) >=
          new Date(filtros.fechaDesde.replace(/-/g, '/'))
      );
      console.log(filteredReservas);
    }

    if (filtros.fechaHasta) {
      filteredReservas = filteredReservas.filter(
        (reserva) =>
          new Date(reserva.fecha) <=
          new Date(filtros.fechaHasta.replace(/-/g, '/'))
      );
    }

    // Format the 'fecha' property using Angular's formatDate
    console.log('ddas' + filteredReservas);
    let formattedReservas: ReservaDeTurnoFormateada[] = filteredReservas.map(
      (reserva) => {
        console.log('112' + reserva);
        return {
          ...reserva,
          fecha: this.formattedDate(new Date(reserva.fecha)), // Format the 'fecha' property
          doctor: reserva.doctor.nombre + ' ' + reserva.doctor.apellido,
          paciente: reserva.paciente.nombre + ' ' + reserva.paciente.apellido,
        };
      }
    );
    return of(formattedReservas);
  }

  //metodo para obtener la lista de categorias, usada para otros componentes
  getAllReservas() {
    return this.reservas;
  }

  // Add a new reservation
  addReserva(reserva: ReservaDeTurno): Observable<ReservaDeTurno[]> {
    // Generate a unique ID for the new reservation
    reserva.id = this.generateNewId();
    // Push the new reservation to the array
    this.reservas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
    console.log(reserva);
    return of(this.reservas);
  }

  // Cancel a reservation by its ID
  cancelReserva(idReserva: number): Observable<ReservaDeTurno[]> {
    const index = this.reservas.findIndex((r) => r.id === idReserva);

    if (index !== -1) {
      // Remove the reservation from the array
      this.reservas.splice(index, 1);
    }
    localStorage.setItem('reservas', JSON.stringify(this.reservas));
    return of(this.reservas);
  }

  // Generate a unique ID for a new reservation (you may need to implement this logic)
  generateNewId(): number {
    // Find the maximum ID in the current data
    const maxId = Math.max(...this.reservas.map((p) => p.id));
    if (maxId === -Infinity) {
      // If there are no reservations, start the counter at 0
      return 0;
    }
    // Generate a new ID by incrementing the maximum ID
    return maxId + 1;
  }
}
