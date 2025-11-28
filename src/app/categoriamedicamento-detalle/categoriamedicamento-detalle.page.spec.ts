import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriamedicamentoDetallePage } from './categoriamedicamento-detalle.page';

describe('CategoriamedicamentoDetallePage', () => {
  let component: CategoriamedicamentoDetallePage;
  let fixture: ComponentFixture<CategoriamedicamentoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriamedicamentoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
