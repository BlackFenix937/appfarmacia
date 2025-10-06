import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MunicipioCrearPage } from './municipio-crear.page';

describe('MunicipioCrearPage', () => {
  let component: MunicipioCrearPage;
  let fixture: ComponentFixture<MunicipioCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
