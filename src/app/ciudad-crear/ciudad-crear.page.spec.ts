import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadCrearPage } from './ciudad-crear.page';

describe('CiudadCrearPage', () => {
  let component: CiudadCrearPage;
  let fixture: ComponentFixture<CiudadCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
