import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturaCrearPage } from './factura-crear.page';

describe('FacturaCrearPage', () => {
  let component: FacturaCrearPage;
  let fixture: ComponentFixture<FacturaCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
