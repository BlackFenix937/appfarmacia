import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MunicipioDetallePage } from './municipio-detalle.page';

describe('MunicipioDetallePage', () => {
  let component: MunicipioDetallePage;
  let fixture: ComponentFixture<MunicipioDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
