import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoDetallePage } from './estado-detalle.page';

describe('EstadoDetallePage', () => {
  let component: EstadoDetallePage;
  let fixture: ComponentFixture<EstadoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
