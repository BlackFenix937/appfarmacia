import { TestBed } from '@angular/core/testing';

import { Compradetalle } from './compradetalle';

describe('Compradetalle', () => {
  let service: Compradetalle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Compradetalle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
