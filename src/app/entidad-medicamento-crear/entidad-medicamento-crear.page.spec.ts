import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadMedicamentoCrearPage } from './entidad-medicamento-crear.page';

describe('EntidadMedicamentoCrearPage', () => {
  let component: EntidadMedicamentoCrearPage;
  let fixture: ComponentFixture<EntidadMedicamentoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadMedicamentoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
