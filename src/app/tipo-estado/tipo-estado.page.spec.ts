import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoEstadoPage } from './tipo-estado.page';

describe('TipoEstadoPage', () => {
  let component: TipoEstadoPage;
  let fixture: ComponentFixture<TipoEstadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
