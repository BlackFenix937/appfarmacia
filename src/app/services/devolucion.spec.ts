import { TestBed } from '@angular/core/testing';

import { Devolucion } from './devolucion';

describe('Devolucion', () => {
  let service: Devolucion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Devolucion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
