import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaAdministracionComponent } from './categoria-admministracion/categoria-admministracion.component'

@NgModule({
  declarations: [
    AppComponent,
    CategoriaAdministracionComponent
  ],  
  imports: [
    BrowserModule,
    FormsModule, // Agrega FormsModule aquí
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
