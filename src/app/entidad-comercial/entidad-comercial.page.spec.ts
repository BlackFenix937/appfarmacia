import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EntidadComercialPage } from './entidad-comercial.page';

describe('EntidadComercialPage', () => {
  let component: EntidadComercialPage;
  let fixture: ComponentFixture<EntidadComercialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadComercialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
