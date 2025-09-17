import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentoPage } from './medicamento.page';

describe('MedicamentoPage', () => {
  let component: MedicamentoPage;
  let fixture: ComponentFixture<MedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
