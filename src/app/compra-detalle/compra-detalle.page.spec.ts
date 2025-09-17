import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraDetallePage } from './compra-detalle.page';

describe('CompraDetallePage', () => {
  let component: CompraDetallePage;
  let fixture: ComponentFixture<CompraDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
