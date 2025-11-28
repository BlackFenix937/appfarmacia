import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicamentocomponenteCrearPage } from './medicamentocomponente-crear.page';

describe('MedicamentocomponenteCrearPage', () => {
  let component: MedicamentocomponenteCrearPage;
  let fixture: ComponentFixture<MedicamentocomponenteCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentocomponenteCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
