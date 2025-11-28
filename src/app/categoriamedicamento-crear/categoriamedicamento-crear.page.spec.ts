import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriamedicamentoCrearPage } from './categoriamedicamento-crear.page';

describe('CategoriamedicamentoCrearPage', () => {
  let component: CategoriamedicamentoCrearPage;
  let fixture: ComponentFixture<CategoriamedicamentoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriamedicamentoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
