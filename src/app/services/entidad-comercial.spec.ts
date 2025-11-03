import { TestBed } from '@angular/core/testing';

import { EntidadComercial } from './entidad-comercial';

describe('EntidadComercial', () => {
  let service: EntidadComercial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadComercial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
