import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoDetallePage } from './pago-detalle.page';

describe('PagoDetallePage', () => {
  let component: PagoDetallePage;
  let fixture: ComponentFixture<PagoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
