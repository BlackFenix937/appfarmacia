import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturaDetallePage } from './factura-detalle.page';

describe('FacturaDetallePage', () => {
  let component: FacturaDetallePage;
  let fixture: ComponentFixture<FacturaDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
