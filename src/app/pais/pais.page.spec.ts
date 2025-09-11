import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisPage } from './pais.page';

describe('PaisPage', () => {
  let component: PaisPage;
  let fixture: ComponentFixture<PaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
