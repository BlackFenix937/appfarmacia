import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteCrearPage } from './cliente-crear.page';

describe('ClienteCrearPage', () => {
  let component: ClienteCrearPage;
  let fixture: ComponentFixture<ClienteCrearPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
