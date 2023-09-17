import { Component } from '@angular/core';
import { PacientesDoctores } from 'src/app/models/pacientes-doctores.models';
import { PacientesDoctoresService } from '../pacientes-doctores.service';

import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-pacientes-doctores',
  templateUrl: './pacientes-doctores.component.html',
  styleUrls: ['./pacientes-doctores.component.css']
})
export class PacientesDoctoresComponent {
  personas: PacientesDoctores[] = [];
  nuevapersona: PacientesDoctores = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  personaEditar: PacientesDoctores | null = null;

  personasFiltradas: PacientesDoctores[] = []; // Lista filtrada
  filtroNombre = '';
  filtroApellido = '';
  filtroProfesion = 'todos'; // 'todos', 'doctores', 'pacientes'


  constructor(public pacientesDoctoresService: PacientesDoctoresService) {
    this.personas = this.pacientesDoctoresService.getPacientesDoctores();
  }

  agregarPersona() {
    this.pacientesDoctoresService.agregarPacientesDoctores(this.nuevapersona);
    this.nuevapersona = { idPersona: 0, nombre: '', apellido: '', telefono: '', email: '', cedula: '', flag_es_doctor: '' };
  }

  editarPersona(persona: PacientesDoctores) {
    this.personaEditar = persona;
  }

  guardarEdicion() {
    if (this.personaEditar) {
      this.pacientesDoctoresService.editarPacientesDoctores(this.personaEditar);
      this.personaEditar = null;
    }
  }

  cancelarEdicion() {
    this.personaEditar = null;
  }

  eliminarPersona(idPersona: number) {
    this.pacientesDoctoresService.eliminarPacientesDoctores(idPersona);
  }


  // método para validar la entrada de flag_es_doctor
  // Agrega una función de validación que se ejecutará automáticamente cuando cambie el valor del input
  validarFlagEsDoctor() {
    if (this.nuevapersona.flag_es_doctor !== '0' && this.nuevapersona.flag_es_doctor !== '1') {
      this.nuevapersona.flag_es_doctor = ''; // Restablece a un valor por defecto (puede ser '0' o '1' según tu lógica).
    }
  }

  // Método para aplicar el filtrado por nombre, apellido y profesion
  aplicarFiltro() {
    this.personas = this.personas.filter(persona => {
      const nombreCoincide = persona.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const apellidoCoincide = persona.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase());
      const esDoctor = persona.flag_es_doctor === '1';
      const esPaciente = persona.flag_es_doctor === '0';

      if (this.filtroProfesion === 'todos') {
        return nombreCoincide && apellidoCoincide;
      } else if (this.filtroProfesion === 'doctores') {
        return nombreCoincide && apellidoCoincide && esDoctor;
      } else if (this.filtroProfesion === 'pacientes') {
        return nombreCoincide && apellidoCoincide && esPaciente;
      }

      return false;
    });
  }

  


}
