import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoCrearPage } from './medicamento-crear.page';

describe('MedicamentoCrearPage', () => {
  let component: MedicamentoCrearPage;
  let fixture: ComponentFixture<MedicamentoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
