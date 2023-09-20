import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FichaClinica } from '../models/ficha-clinica.models'; // Import the FichaClinica interface
import { FichaClinicaFiltro } from './ficha-clinica-filtro.interface';

@Injectable({
  providedIn: 'root',
})
export class FichaClinicaService {
  fichasClinicas: FichaClinica[];

  constructor() {
    // Get the list of fichas clínicas from local storage
    const ls = localStorage.getItem('fichasClinicas');
    this.fichasClinicas = ls ? JSON.parse(ls) : [];
  }

  formattedDate(date: Date) {
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0
    let yyyy = date.getFullYear();
    return yyyy + '/' + mm + '/' + dd;
  }

  // Get a list of fichas clínicas based on filters
  getFichasClinicas(filtros: FichaClinicaFiltro): Observable<FichaClinica[]> {
    // Simulate filtering based on filters if needed
    let filteredFichasClinicas = this.fichasClinicas;
    console.log(filteredFichasClinicas);
    if (filtros.doctor) {
      filteredFichasClinicas = filteredFichasClinicas.filter((ficha) =>
        ficha.doctor.nombre
          .toLowerCase()
          .concat(' ', ficha.doctor.apellido.toLowerCase())
          .includes(filtros.doctor.toLowerCase())
      );
    }
    if (filtros.paciente) {
      filteredFichasClinicas = filteredFichasClinicas.filter((ficha) =>
        ficha.paciente.nombre
          .toLowerCase()
          .concat(' ', ficha.paciente.apellido.toLowerCase())
          .includes(filtros.paciente.toLowerCase())
      );
    }
    console.log(filteredFichasClinicas);

    if (filtros.fechaDesde) {
      if (filteredFichasClinicas.length > 0) {
        console.log(filteredFichasClinicas[0].fecha);
      }
      console.log(new Date(filtros.fechaDesde));

      filteredFichasClinicas = filteredFichasClinicas.filter(
        (ficha) => new Date(ficha.fecha) >= new Date(filtros.fechaDesde)
      );
    }
    if (filtros.fechaHasta) {
      filteredFichasClinicas = filteredFichasClinicas.filter(
        (ficha) => new Date(ficha.fecha) <= new Date(filtros.fechaHasta)
      );
    }
    if (filtros.categoria) {
      filteredFichasClinicas = filteredFichasClinicas.filter(
        (ficha) => ficha.categoria.idCategoria === +filtros.categoria
      );
    }
    console.log(filteredFichasClinicas);
    return of(filteredFichasClinicas);
  }

  // Add a new ficha clínica
  addFichaClinica(fichaClinica: FichaClinica): Observable<FichaClinica[]> {
    // Generate a unique ID for the new ficha clínica
    fichaClinica.id = this.generateNewId();

    // Push the new ficha clínica to the array
    this.fichasClinicas.push(fichaClinica);
    localStorage.setItem('fichasClinicas', JSON.stringify(this.fichasClinicas));
    return of(this.fichasClinicas);
  }

  // Generate a unique ID for a new ficha clínica (you may need to implement this logic)
  generateNewId(): number {
    // Find the maximum ID in the current data
    const maxId = Math.max(...this.fichasClinicas.map((f) => f.id));
    if (maxId === -Infinity) {
      return 0;
    }
    // Generate a new ID by incrementing the maximum ID
    return maxId + 1;
  }
}
