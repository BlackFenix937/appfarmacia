import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CiudadPage } from './ciudad.page';

describe('CiudadPage', () => {
  let component: CiudadPage;
  let fixture: ComponentFixture<CiudadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CiudadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
