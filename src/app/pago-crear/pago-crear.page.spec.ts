import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoCrearPage } from './pago-crear.page';

describe('PagoCrearPage', () => {
  let component: PagoCrearPage;
  let fixture: ComponentFixture<PagoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
