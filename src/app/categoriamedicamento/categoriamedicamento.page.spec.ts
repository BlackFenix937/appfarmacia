import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriamedicamentoPage } from './categoriamedicamento.page';

describe('CategoriamedicamentoPage', () => {
  let component: CategoriamedicamentoPage;
  let fixture: ComponentFixture<CategoriamedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriamedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
