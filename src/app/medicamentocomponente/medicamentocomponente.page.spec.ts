import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentocomponentePage } from './medicamentocomponente.page';

describe('MedicamentocomponentePage', () => {
  let component: MedicamentocomponentePage;
  let fixture: ComponentFixture<MedicamentocomponentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentocomponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
