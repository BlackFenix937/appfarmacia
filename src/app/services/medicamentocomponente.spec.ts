import { TestBed } from '@angular/core/testing';

import { Medicamentocomponente } from './medicamentocomponente';

describe('Medicamentocomponente', () => {
  let service: Medicamentocomponente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medicamentocomponente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
