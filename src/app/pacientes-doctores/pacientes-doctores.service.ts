import { Injectable } from '@angular/core';
import { PacientesDoctores } from '../models/pacientes-doctores.models';

@Injectable({
  providedIn: 'root'
})
export class PacientesDoctoresService {
  private localStorageKey = 'pacientesDoctores'; // Define una clave para el localStorage

  constructor() {
    // Recupera los datos del localStorage al inicializar el servicio
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      this.personas = JSON.parse(data);
    }
  }

  private personas: PacientesDoctores[] = [];

  getPacientesDoctores(): PacientesDoctores[] {
    return this.personas;
  }

  agregarPacientesDoctores(persona: PacientesDoctores) {
    this.personas.push(persona);
    this.actualizarLocalStorage();
  }

  editarPacientesDoctores(persona: PacientesDoctores) {
    const index = this.personas.findIndex(c => c.idPersona === persona.idPersona);
    if (index !== -1) {
      this.personas[index] = persona;
      this.actualizarLocalStorage();
    }
  }

  eliminarPacientesDoctores(idPacientesDoctores: number) {
    const index = this.personas.findIndex(c => c.idPersona === idPacientesDoctores);
    if (index !== -1) {
      this.personas.splice(index, 1);
      this.actualizarLocalStorage();
    }
  }

  private actualizarLocalStorage() {
    // Guarda los datos en el localStorage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.personas));
  }
}
