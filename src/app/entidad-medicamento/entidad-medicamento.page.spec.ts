import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadMedicamentoPage } from './entidad-medicamento.page';

describe('EntidadMedicamentoPage', () => {
  let component: EntidadMedicamentoPage;
  let fixture: ComponentFixture<EntidadMedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
