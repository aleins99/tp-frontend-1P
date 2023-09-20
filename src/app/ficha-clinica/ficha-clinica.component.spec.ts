import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaComponent } from './ficha-clinica.component';

describe('FichaClinicaComponent', () => {
  let component: FichaClinicaComponent;
  let fixture: ComponentFixture<FichaClinicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaClinicaComponent]
    });
    fixture = TestBed.createComponent(FichaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
