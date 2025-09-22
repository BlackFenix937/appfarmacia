import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevolucionDetallePage } from './devolucion-detalle.page';

describe('DevolucionDetallePage', () => {
  let component: DevolucionDetallePage;
  let fixture: ComponentFixture<DevolucionDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
