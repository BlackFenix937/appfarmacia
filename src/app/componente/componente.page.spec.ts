import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentePage } from './componente.page';

describe('ComponentePage', () => {
  let component: ComponentePage;
  let fixture: ComponentFixture<ComponentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
