import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MunicipioPage } from './municipio.page';

describe('MunicipioPage', () => {
  let component: MunicipioPage;
  let fixture: ComponentFixture<MunicipioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
