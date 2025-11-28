import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteCrearPage } from './componente-crear.page';

describe('ComponenteCrearPage', () => {
  let component: ComponenteCrearPage;
  let fixture: ComponentFixture<ComponenteCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
