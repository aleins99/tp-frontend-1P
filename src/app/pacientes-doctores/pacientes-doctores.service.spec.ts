import { TestBed } from '@angular/core/testing';

import { PacientesDoctoresService } from './pacientes-doctores.service';

describe('PacientesDoctoresService', () => {
  let service: PacientesDoctoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesDoctoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
