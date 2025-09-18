import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadMedicamentoDetallePage } from './entidad-medicamento-detalle.page';

describe('EntidadMedicamentoDetallePage', () => {
  let component: EntidadMedicamentoDetallePage;
  let fixture: ComponentFixture<EntidadMedicamentoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadMedicamentoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
