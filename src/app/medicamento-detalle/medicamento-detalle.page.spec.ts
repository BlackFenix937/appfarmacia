import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoDetallePage } from './medicamento-detalle.page';

describe('MedicamentoDetallePage', () => {
  let component: MedicamentoDetallePage;
  let fixture: ComponentFixture<MedicamentoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
