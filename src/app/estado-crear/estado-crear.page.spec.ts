import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoCrearPage } from './estado-crear.page';

describe('EstadoCrearPage', () => {
  let component: EstadoCrearPage;
  let fixture: ComponentFixture<EstadoCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
