import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//import { PacientesDoctoresComponent } from './pacientes-doctores/pacientes-doctores/pacientes-doctores.component'; // Make sure the path is correct

@NgModule({
  declarations: [
    //PacientesDoctoresComponent, // Include your component here
    // Other components if you have them
  ],
  imports: [
    //BrowserModule,
    //ReactiveFormsModule, // Make sure you have ReactiveFormsModule imported here
    // Other modules
  ],
  providers: [],
  //bootstrap: [PacientesDoctoresComponent] // Bootstrap your component if it's the root component
})
export class PacientesDoctoresModule { }
