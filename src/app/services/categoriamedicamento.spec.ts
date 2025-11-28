import { TestBed } from '@angular/core/testing';

import { Categoriamedicamento } from './categoriamedicamento';

describe('Categoriamedicamento', () => {
  let service: Categoriamedicamento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Categoriamedicamento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
