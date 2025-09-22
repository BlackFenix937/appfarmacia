import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompradetallePage } from './compradetalle.page';

describe('CompradetallePage', () => {
  let component: CompradetallePage;
  let fixture: ComponentFixture<CompradetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
