import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesDoctoresComponent } from './pacientes-doctores.component';

describe('PacientesDoctoresComponent', () => {
  let component: PacientesDoctoresComponent;
  let fixture: ComponentFixture<PacientesDoctoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesDoctoresComponent]
    });
    fixture = TestBed.createComponent(PacientesDoctoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
