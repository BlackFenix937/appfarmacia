import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaisDetallePage } from './pais-detalle.page';

describe('PaisDetallePage', () => {
  let component: PaisDetallePage;
  let fixture: ComponentFixture<PaisDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
