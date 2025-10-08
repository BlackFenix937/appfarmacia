import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadComercialCrearPage } from './entidad-comercial-crear.page';

describe('EntidadComercialCrearPage', () => {
  let component: EntidadComercialCrearPage;
  let fixture: ComponentFixture<EntidadComercialCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadComercialCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
