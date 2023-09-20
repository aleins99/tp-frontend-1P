// src/app/categoria.service.ts
import { Injectable } from '@angular/core';
import { Categoria } from './models/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private categorias: Categoria[] = [];

  constructor() {
    const categoriasGuardadas = localStorage.getItem('categorias');
    if (categoriasGuardadas) {
      this.categorias = JSON.parse(categoriasGuardadas);
    }
  }

  getCategorias(): Categoria[] {
    return this.categorias;
  }

  agregarCategoria(categoria: Categoria) {
    this.categorias.push(categoria);
    this.actualizarLocalStorage();
  }

  editarCategoria(categoria: Categoria) {
    const index = this.categorias.findIndex(
      (c) => c.idCategoria === categoria.idCategoria
    );
    if (index !== -1) {
      this.categorias[index] = categoria;
      this.actualizarLocalStorage();
    }
  }

  eliminarCategoria(idCategoria: number) {
    const index = this.categorias.findIndex(
      (c) => c.idCategoria === idCategoria
    );
    if (index !== -1) {
      this.categorias.splice(index, 1);
      this.actualizarLocalStorage();
    }
  }

  private actualizarLocalStorage() {
    localStorage.setItem('categorias', JSON.stringify(this.categorias));
  }
}
