// src/app/categoria-administracion/categoria-administracion.component.ts
import { Component } from '@angular/core';
import { Categoria } from '../models/categoria.models';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-administracion',
  templateUrl: './categoria-admministracion.component.html',
  styleUrls: ['./categoria-admministracion.component.css']
})
export class CategoriaAdministracionComponent {
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = { idCategoria: 0, descripcion: '' };
  categoriaAEditar: Categoria | null = null;

  constructor(public categoriaService: CategoriaService) {
    this.categorias = this.categoriaService.getCategorias();
  }

  agregarCategoria() {
    this.categoriaService.agregarCategoria(this.nuevaCategoria);
    this.nuevaCategoria = { idCategoria: 0, descripcion: '' };
  }

  editarCategoria(categoria: Categoria) {
    this.categoriaAEditar = categoria;
  }

  guardarEdicion() {
    if (this.categoriaAEditar) {
      this.categoriaService.editarCategoria(this.categoriaAEditar);
      this.categoriaAEditar = null;
    }
  }

  cancelarEdicion() {
    this.categoriaAEditar = null;
  }

  eliminarCategoria(idCategoria: number) {
    this.categoriaService.eliminarCategoria(idCategoria);
  }
}
