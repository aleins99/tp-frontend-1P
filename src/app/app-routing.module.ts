import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaAdministracionComponent } from './categoria-admministracion/categoria-admministracion.component';
import { PacientesDoctoresComponent } from './pacientes-doctores/pacientes-doctores/pacientes-doctores.component';


const routes: Routes = [

  { path: '', redirectTo: '/registroPersonas', pathMatch: 'full'},
  { path: 'registroPersonas', component: PacientesDoctoresComponent},

  { path: '', redirectTo: '/categorias', pathMatch: 'full' }, // Redirige a /categorias
  { path: 'categorias', component: CategoriaAdministracionComponent },
  // Otras rutas...

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
