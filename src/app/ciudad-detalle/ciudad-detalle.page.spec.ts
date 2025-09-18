import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadDetallePage } from './ciudad-detalle.page';

describe('CiudadDetallePage', () => {
  let component: CiudadDetallePage;
  let fixture: ComponentFixture<CiudadDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
