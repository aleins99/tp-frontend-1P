import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAdministracionComponent } from './categoria-admministracion.component';

describe('CategoriaAdmministracionComponent', () => {
  let component: CategoriaAdministracionComponent;
  let fixture: ComponentFixture<CategoriaAdministracionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaAdministracionComponent]
    });
    fixture = TestBed.createComponent(CategoriaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
