import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisCrearPage } from './pais-crear.page';

describe('PaisCrearPage', () => {
  let component: PaisCrearPage;
  let fixture: ComponentFixture<PaisCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
