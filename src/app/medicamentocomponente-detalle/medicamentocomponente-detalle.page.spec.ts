import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentocomponenteDetallePage } from './medicamentocomponente-detalle.page';

describe('MedicamentocomponenteDetallePage', () => {
  let component: MedicamentocomponenteDetallePage;
  let fixture: ComponentFixture<MedicamentocomponenteDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentocomponenteDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
