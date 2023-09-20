import { Component, OnInit } from '@angular/core';
import { FichaClinicaService } from './ficha-clinica.service';
import { FichaClinica } from '../models/ficha-clinica.models';
import { FichaClinicaFiltro } from './ficha-clinica-filtro.interface';
import { Categoria } from '../models/categoria.models';
import { ReservaDeTurno } from '../models/reserva-turnos.models';
import { ReservaService } from '../reserva-turnos/reserva.service';
import { CategoriaService as ConsultaService } from '../categoria.service';
import { PacientesDoctores as Persona } from '../models/pacientes-doctores.models';
import { PacientesDoctoresService as RegistroPersonaService } from '../pacientes-doctores/pacientes-doctores.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-ficha-clinica',
  templateUrl: './ficha-clinica.component.html',
  styleUrls: ['./ficha-clinica.component.css'],
})
export class FichaClinicaComponent implements OnInit {
  fichasClinicasFiltradas: FichaClinica[] = [];
  fechaFiltroReserva: Date = new Date(0);
  reservasDeTurno: ReservaDeTurno[] = [];
  categorias: Categoria[] = [];
  personas: Persona[] = [];
  filtros: FichaClinicaFiltro = {
    doctor: '',
    paciente: '',
    fechaDesde: '',
    fechaHasta: '',
    categoria: 0,
  };
  personaVacia: Persona = {
    idPersona: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    cedula: '',
    flag_es_doctor: '',
  };
  nuevaFichaClinica: FichaClinica = {
    id: 0,
    paciente: this.personaVacia,
    doctor: this.personaVacia,
    motivoConsulta: '',
    diagnostico: '',
    fecha: new Date(0),
    reserva: {
      id: 0,
      doctor: this.personaVacia,
      paciente: this.personaVacia,
      fecha: new Date(0),
      hora: '',
      categoria: { idCategoria: 0, descripcion: '' },
    },
    categoria: { idCategoria: 0, descripcion: '' },
  };

  constructor(
    private fichaClinicaService: FichaClinicaService,
    private categoriaService: ConsultaService,
    private reservaService: ReservaService,
    private personaService: RegistroPersonaService
  ) {}

  ngOnInit(): void {
    this.initFichas();
    this.initReservas();
    this.loadCategorias();
    this.loadPersonas();
  }

  // Carga las reservas del día actual
  initFichas(): void {
    this.filtros.fechaDesde = this.fichaClinicaService.formattedDate(
      new Date()
    );
    this.filtros.fechaHasta = this.fichaClinicaService.formattedDate(
      new Date()
    );

    // Llama al servicio para cargar las reservas con los filtros
    this.applyFilters();
  }

  initReservas(): void {
    this.loadReservas();
  }

  applyFilters(): void {
    this.fichaClinicaService
      .getFichasClinicas(this.filtros)
      .subscribe((fichasClinicas) => {
        this.fichasClinicasFiltradas = fichasClinicas;
      });
  }

  loadCategorias(): void {
    this.categorias = this.categoriaService.getCategorias();
  }

  //agarra todas las reservas del componente reserva de turno component
  loadReservas(): void {
    const reservas = this.reservaService.getAllReservas();
    reservas.sort(
      (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
    this.reservasDeTurno = reservas;
  }

  loadPersonas(): void {
    this.personas = this.personaService.getPacientesDoctores();
  }

  //generar el XLSX
  exportExcel(): void {
    const data = this.fichasClinicasFiltradas.map((fichaClinica) => ({
      Doctor: fichaClinica.doctor.nombre + ' ' + fichaClinica.doctor.apellido,
      Paciente:
        fichaClinica.paciente.nombre + ' ' + fichaClinica.paciente.apellido,
      Fecha: this.fichaClinicaService.formattedDate(
        new Date(fichaClinica.fecha)
      ),
      'Motivo de Consulta': fichaClinica.motivoConsulta,
      Diagnóstico: fichaClinica.diagnostico,
      Categoría: fichaClinica.categoria.descripcion,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'FichasClinicas');

    XLSX.writeFile(wb, 'fichas_clinicas.xlsx');
  }

  //generar pdf
  public exportPDF(): void {
    let DATA: any = document.getElementById('Exportar');
    html2canvas(DATA).then(
      (canvas: {
        height: number;
        width: number;
        toDataURL: (arg0: string) => any;
      }) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save('fichas_clinicas.pdf');
      }
    );
  }

  agregarFichaClinicaConReserva(): void {
    let fichaClinica: FichaClinica = {
      id: 1,
      paciente: this.nuevaFichaClinica.reserva.paciente,
      doctor: this.nuevaFichaClinica.reserva.doctor,
      motivoConsulta: this.nuevaFichaClinica.motivoConsulta,
      diagnostico: this.nuevaFichaClinica.diagnostico,
      fecha: this.nuevaFichaClinica.reserva.fecha,
      reserva: this.nuevaFichaClinica.reserva,
      categoria: this.nuevaFichaClinica.categoria,
    };
    this.fichaClinicaService.addFichaClinica(fichaClinica).subscribe(() => {
      // Reload the reservations with filters applied
      this.applyFilters();
    });
  }

  agregarFichaClinica(): void {
    let fichaClinica: FichaClinica = {
      id: 0,
      paciente: this.nuevaFichaClinica.paciente,
      doctor: this.nuevaFichaClinica.doctor,
      motivoConsulta: this.nuevaFichaClinica.motivoConsulta,
      diagnostico: this.nuevaFichaClinica.diagnostico,
      fecha: new Date(this.nuevaFichaClinica.fecha + 'T00:00:00'),
      reserva: this.nuevaFichaClinica.reserva,
      categoria: this.nuevaFichaClinica.categoria,
    };

    this.fichaClinicaService.addFichaClinica(fichaClinica).subscribe(() => {
      // Reload the reservations with filters applied
      this.applyFilters();
    });

    fichaClinica = this.nuevaFichaClinica;
  }
}
