import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadComercialDetallePage } from './entidad-comercial-detalle.page';

describe('EntidadComercialDetallePage', () => {
  let component: EntidadComercialDetallePage;
  let fixture: ComponentFixture<EntidadComercialDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadComercialDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
