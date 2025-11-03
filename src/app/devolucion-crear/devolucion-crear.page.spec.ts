import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevolucionCrearPage } from './devolucion-crear.page';

describe('DevolucionCrearPage', () => {
  let component: DevolucionCrearPage;
  let fixture: ComponentFixture<DevolucionCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
