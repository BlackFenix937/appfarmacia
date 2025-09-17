import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriaMedicamentoPage } from './categoria-medicamento.page';

describe('CategoriaMedicamentoPage', () => {
  let component: CategoriaMedicamentoPage;
  let fixture: ComponentFixture<CategoriaMedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaMedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
