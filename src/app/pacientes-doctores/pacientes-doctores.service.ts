import { Injectable } from '@angular/core';
import { PacientesDoctores } from '../models/pacientes-doctores.models';

@Injectable({
  providedIn: 'root'
})
export class PacientesDoctoresService {

  private personas: PacientesDoctores[] = [
  ];

  getPacientesDoctores(): PacientesDoctores[] {
    return this.personas;
  }

  agregarPacientesDoctores(persona: PacientesDoctores) {
    this.personas.push(persona);
  }

  editarPacientesDoctores(persona: PacientesDoctores) {
    const index = this.personas.findIndex(c => c.idPersona === persona.idPersona);
    if (index !== -1) {
      this.personas[index] = persona;
    }
  }

  eliminarPacientesDoctores(idPacientesDoctores: number) {
    const index = this.personas.findIndex(c => c.idPersona === idPacientesDoctores);
    if (index !== -1) {
      this.personas.splice(index, 1);
    }
  }

  constructor() { }
}
