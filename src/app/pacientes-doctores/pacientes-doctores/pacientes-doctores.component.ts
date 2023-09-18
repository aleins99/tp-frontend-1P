import { Component } from '@angular/core';
import { PacientesDoctores } from 'src/app/models/pacientes-doctores.models';
import { PacientesDoctoresService } from '../pacientes-doctores.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    // Carga los datos desde el servicio (que los obtiene del localStorage)
    this.personas = this.pacientesDoctoresService.getPacientesDoctores();
    // Inicializa personasFiltradas con todos los datos
    this.personasFiltradas = this.personas;
  }

  validarFlagEsDoctor() {
    if (this.nuevapersona.flag_es_doctor !== '0' && this.nuevapersona.flag_es_doctor !== '1') {
      this.nuevapersona.flag_es_doctor = ''; // Restablece a un valor por defecto (puede ser '0' o '1' según tu lógica).
    }
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

  // Método para aplicar el filtrado por nombre, apellido y profesion
  aplicarFiltro() {
    // Copia todos los elementos del arreglo original a personasFiltradas
    this.personasFiltradas = [...this.personas];

    if (this.filtroNombre) {
      this.personasFiltradas = this.personasFiltradas.filter(persona =>
        persona.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }

    if (this.filtroApellido) {
      this.personasFiltradas = this.personasFiltradas.filter(persona =>
        persona.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase())
      );
    }

    if (this.filtroProfesion !== 'todos') {
      const esDoctor = this.filtroProfesion === 'doctores';
      this.personasFiltradas = this.personasFiltradas.filter(persona =>
        persona.flag_es_doctor === (esDoctor ? '1' : '0')
      );
    }
  }

  // Método para borrar todos los filtros y mostrar todos los elementos
  borrarFiltros() {
    this.filtroNombre = '';
    this.filtroApellido = '';
    this.filtroProfesion = 'todos';
    this.personasFiltradas = [...this.personas];
  }
}
