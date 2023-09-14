import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAdministracionComponent } from './categoria-admministracion/categoria-admministracion.component';

const routes: Routes = [
  { path: '', redirectTo: '/categorias', pathMatch: 'full' }, // Redirige a /categorias
  { path: 'categorias', component: CategoriaAdministracionComponent },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
