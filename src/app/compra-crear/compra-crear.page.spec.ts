import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompraCrearPage } from './compra-crear.page';

describe('CompraCrearPage', () => {
  let component: CompraCrearPage;
  let fixture: ComponentFixture<CompraCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
