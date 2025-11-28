import { TestBed } from '@angular/core/testing';

import { Tipoestado } from './tipoestado';

describe('Tipoestado', () => {
  let service: Tipoestado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tipoestado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
