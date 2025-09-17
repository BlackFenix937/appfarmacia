import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoComponentePage } from './medicamento-componente.page';

describe('MedicamentoComponentePage', () => {
  let component: MedicamentoComponentePage;
  let fixture: ComponentFixture<MedicamentoComponentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoComponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
