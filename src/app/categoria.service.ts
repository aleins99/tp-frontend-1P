// src/app/categoria.service.ts
import { Injectable } from '@angular/core';
import { Categoria } from './models/categoria.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private categorias: Categoria[] = [
  ];

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  agregarCategoria(categoria: Categoria) {
    this.categorias.push(categoria);
  }

  editarCategoria(categoria: Categoria) {
    const index = this.categorias.findIndex(c => c.idCategoria === categoria.idCategoria);
    if (index !== -1) {
      this.categorias[index] = categoria;
    }
  }

  eliminarCategoria(idCategoria: number) {
    const index = this.categorias.findIndex(c => c.idCategoria === idCategoria);
    if (index !== -1) {
      this.categorias.splice(index, 1);
    }
  }
}